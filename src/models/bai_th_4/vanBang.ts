import { useState, useCallback, useEffect } from 'react';
import { message } from 'antd';
import {
  getVanBang,
  createVanBang,
  updateVanBang,
  deleteVanBang,
  getSoVanBang,
  getQuyetDinh,
  getCauHinh,
  getMockData,
} from '@/services/Bai_TH4/vanBang';
import { VanBangAPI } from '@/services/Bai_TH4/vanBang/typings';

/**
 * Model for văn bằng management
 * Handles state and operations for văn bằng data
 */
export default () => {
  // State management
  const [vanBangs, setVanBangs] = useState<VanBangAPI.VanBang[]>([]);
  const [soVanBangs, setSoVanBangs] = useState<VanBangAPI.SoVanBang[]>([]);
  const [quyetDinhs, setQuyetDinhs] = useState<VanBangAPI.QuyetDinh[]>([]);
  const [cauHinhs, setCauHinhs] = useState<VanBangAPI.CauHinh[]>([]);
  const [selectedVanBang, setSelectedVanBang] = useState<VanBangAPI.VanBang | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Fetch all data from the server/mock data
   */
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      const mockData = await getMockData();
      console.log('Data fetched:', mockData);
      
      // Set data with fallbacks to empty arrays
      setVanBangs(mockData?.vanBang || []);
      setSoVanBangs(mockData?.soVanBang || []);
      setQuyetDinhs(mockData?.quyetDinh || []);
      setCauHinhs(mockData?.cauHinh || []);
      
      // Debug if quyetDinhs is empty - this should help debug the "quyết định không hợp lệ" error
      if (!mockData?.quyetDinh || mockData.quyetDinh.length === 0) {
        console.warn('No quyetDinh records found in the data');
        message.warning('Không tìm thấy dữ liệu quyết định. Vui lòng kiểm tra db.json', 5);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      message.error('Đã xảy ra lỗi khi lấy dữ liệu');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Calculate the next số vào sổ for a specific sổ văn bằng
   * @param soVanBangId ID of the sổ văn bằng
   */
  const getNextSoVaoSo = useCallback((soVanBangId: number) => {
    // Find the sổ văn bằng record
    const selectedSoVanBang = (soVanBangs || []).find(item => item.id === soVanBangId);
    if (!selectedSoVanBang) {
      console.warn(`No soVanBang found for ID: ${soVanBangId}`);
      return 1;
    }
    
    // Calculate the max số vào sổ for this sổ văn bằng
    const filteredVanBangs = (vanBangs || []).filter(vb => {
      const qd = (quyetDinhs || []).find(q => q.id === vb.quyet_dinh_id);
      return qd && qd.so_van_bang_id === soVanBangId;
    });
    
    if (filteredVanBangs.length === 0) return 1;
    
    const maxSoVaoSo = Math.max(...filteredVanBangs.map(vb => vb.so_vao_so || 0), 0);
    return maxSoVaoSo + 1;
  }, [vanBangs, quyetDinhs, soVanBangs]);

  /**
   * Add a new văn bằng record
   * @param data VanBang data to add
   */
  const addVanBang = useCallback(async (data: VanBangAPI.VanBang) => {
    try {
      // For production, use API call: const newVanBang = await createVanBang(data);
      
      // For local development, create new record locally
      const newId = Math.max(...(vanBangs || []).map(vb => vb.id || 0), 0) + 1;
      const newVanBang = { ...data, id: newId };
      setVanBangs([...vanBangs, newVanBang]);
      message.success('Thêm văn bằng thành công');
      return newVanBang;
    } catch (error) {
      console.error('Error adding vanBang:', error);
      message.error('Đã xảy ra lỗi khi thêm văn bằng');
      throw error;
    }
  }, [vanBangs]);

  /**
   * Update an existing văn bằng record
   * @param id ID of the văn bằng to update
   * @param data Updated data
   */
  const updateVanBangData = useCallback(async (id: number, data: VanBangAPI.VanBang) => {
    try {
      // For production, use API call: const updatedVanBang = await updateVanBang(id, data);
      
      // For local development, update record locally
      const updatedVanBangs = (vanBangs || []).map(vb => 
        vb.id === id ? { ...vb, ...data } : vb
      );
      setVanBangs(updatedVanBangs);
      message.success('Cập nhật văn bằng thành công');
      return updatedVanBangs.find(vb => vb.id === id);
    } catch (error) {
      console.error('Error updating vanBang:', error);
      message.error('Đã xảy ra lỗi khi cập nhật văn bằng');
      throw error;
    }
  }, [vanBangs]);

  /**
   * Delete a văn bằng record
   * @param id ID of the văn bằng to delete
   */
  const deleteVanBangData = useCallback(async (id: number) => {
    try {
      // For production, use API call: await deleteVanBang(id);
      
      // For local development, remove record locally
      const filteredVanBangs = (vanBangs || []).filter(vb => vb.id !== id);
      setVanBangs(filteredVanBangs);
      message.success('Xóa văn bằng thành công');
    } catch (error) {
      console.error('Error deleting vanBang:', error);
      message.error('Đã xảy ra lỗi khi xóa văn bằng');
      throw error;
    }
  }, [vanBangs]);

  /**
   * Initialize form for adding a new văn bằng
   * @param quyetDinhId ID of the quyết định associated with the văn bằng
   */
  const initAddForm = useCallback((quyetDinhId: number) => {
    console.log('initAddForm called with quyetDinhId:', quyetDinhId);
    console.log('Current quyetDinhs:', quyetDinhs);
    
    // Check if quyết định data is loaded
    if (!quyetDinhs || quyetDinhs.length === 0) {
      message.error('Chưa tải dữ liệu quyết định. Vui lòng làm mới trang và đảm bảo json-server đang chạy.');
      return;
    }
    
    // Find the quyết định record
    const quyetDinh = quyetDinhs.find(qd => qd.id === quyetDinhId);
    console.log('Found quyetDinh:', quyetDinh);
    
    if (!quyetDinh) {
      message.error(`Quyết định không hợp lệ (ID: ${quyetDinhId} không tồn tại)`);
      return;
    }
    
    // Check if so_van_bang_id exists in the quyetDinh object
    if (!quyetDinh.so_van_bang_id) {
      message.error('Quyết định không có so_van_bang_id');
      return;
    }
    
    // Calculate next số vào sổ
    const soVanBangId = quyetDinh.so_van_bang_id;
    const nextSoVaoSo = getNextSoVaoSo(soVanBangId);
    
    // Initialize form with default values
    setSelectedVanBang({
      so_vao_so: nextSoVaoSo,
      so_hieu_van_bang: '',
      ma_sinh_vien: '',
      ho_ten: '',
      ngay_sinh: '',
      quyet_dinh_id: quyetDinhId,
      dan_toc: '',
      diem_trung_binh: 0,
      xep_loai: '',
      he_dao_tao: '',
      noi_sinh: '',
    } as VanBangAPI.VanBang);
    
    setIsEditing(false);
    setIsModalVisible(true);
  }, [quyetDinhs, getNextSoVaoSo]);

  /**
   * Initialize form for editing an existing văn bằng
   * @param id ID of the văn bằng to edit
   */
  const initEditForm = useCallback((id: number) => {
    console.log('initEditForm called with id:', id);
    
    const vanBang = vanBangs.find(vb => vb.id === id);
    console.log('Found vanBang:', vanBang);
    
    if (vanBang) {
      setSelectedVanBang(vanBang);
      setIsEditing(true);
      setIsModalVisible(true);
    } else {
      message.error('Không tìm thấy văn bằng');
    }
  }, [vanBangs]);

  /**
   * Close the modal form
   */
  const closeModal = useCallback(() => {
    setIsModalVisible(false);
    setSelectedVanBang(null);
  }, []);

  // Initial data loading
  useEffect(() => {
    let isMounted = true;
    console.log('Initial data loading effect triggered');
    fetchAllData().then(() => {
      if (!isMounted) return;
      console.log('Initial data loaded');
    });
    return () => {
      isMounted = false;
    };
  }, [fetchAllData]);

  return {
    vanBangs,
    soVanBangs,
    quyetDinhs,
    cauHinhs,
    selectedVanBang,
    isModalVisible,
    isEditing,
    loading,
    fetchAllData,
    getNextSoVaoSo,
    addVanBang,
    updateVanBangData,
    deleteVanBangData,
    initAddForm,
    initEditForm,
    closeModal,
  };
};