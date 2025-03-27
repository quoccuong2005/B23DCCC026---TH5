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

export default () => {
  const [vanBangs, setVanBangs] = useState<VanBangAPI.VanBang[]>([]);
  const [soVanBangs, setSoVanBangs] = useState<VanBangAPI.SoVanBang[]>([]);
  const [quyetDinhs, setQuyetDinhs] = useState<VanBangAPI.QuyetDinh[]>([]);
  const [cauHinhs, setCauHinhs] = useState<VanBangAPI.CauHinh[]>([]);
  const [selectedVanBang, setSelectedVanBang] = useState<VanBangAPI.VanBang | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch all data from server (using mock for development)
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      const mockData = await getMockData();
      setVanBangs(mockData.vanBang);
      setSoVanBangs(mockData.soVanBang);
      setQuyetDinhs(mockData.quyetDinh);
      setCauHinhs(mockData.cauHinh);
    } catch (error) {
      console.error('Error fetching data:', error);
      message.error('Đã xảy ra lỗi khi lấy dữ liệu');
    } finally {
      setLoading(false);
    }
  }, []);

  // Calculate next số vào sổ for the selected sổ văn bằng based on quyet dịnh liên quan.
  const getNextSoVaoSo = useCallback((soVanBangId: number) => {
    const selectedSoVanBang = soVanBangs.find((item) => item.id === soVanBangId);
    if (!selectedSoVanBang) return 1;
    const maxSoVaoSo = Math.max(
      ...vanBangs
        .filter((vb) => {
          const qd = quyetDinhs.find(q => q.id === vb.quyet_dinh_id);
          return qd && qd.so_van_bang_id === soVanBangId;
        })
        .map((vb) => vb.so_vao_so),
      0
    );
    return maxSoVaoSo + 1;
  }, [vanBangs, quyetDinhs, soVanBangs]);

  // Add new văn bằng
  const addVanBang = useCallback(async (data: VanBangAPI.VanBang) => {
    try {
      // In production, call: await createVanBang(data);
      const newId = Math.max(...vanBangs.map(vb => vb.id || 0)) + 1;
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

  // Update existing văn bằng
  const updateVanBangData = useCallback(async (id: number, data: VanBangAPI.VanBang) => {
    try {
      // In production, call: await updateVanBang(id, data);
      const updatedVanBangs = vanBangs.map(vb => vb.id === id ? { ...vb, ...data } : vb);
      setVanBangs(updatedVanBangs);
      message.success('Cập nhật văn bằng thành công');
      return updatedVanBangs.find(vb => vb.id === id);
    } catch (error) {
      console.error('Error updating vanBang:', error);
      message.error('Đã xảy ra lỗi khi cập nhật văn bằng');
      throw error;
    }
  }, [vanBangs]);

  // Delete văn bằng
  const deleteVanBangData = useCallback(async (id: number) => {
    try {
      // In production, call: await deleteVanBang(id);
      const filteredVanBangs = vanBangs.filter(vb => vb.id !== id);
      setVanBangs(filteredVanBangs);
      message.success('Xóa văn bằng thành công');
    } catch (error) {
      console.error('Error deleting vanBang:', error);
      message.error('Đã xảy ra lỗi khi xóa văn bằng');
      throw error;
    }
  }, [vanBangs]);

  // Initialize form for adding new văn bằng (auto-calculate số vào sổ)
  const initAddForm = useCallback((quyetDinhId: number) => {
    const quyetDinh = quyetDinhs.find(qd => qd.id === quyetDinhId);
    if (!quyetDinh) {
      message.error('Quyết định không hợp lệ');
      return;
    }
    const soVanBangId = quyetDinh.so_van_bang_id;
    const nextSoVaoSo = getNextSoVaoSo(soVanBangId);
    setSelectedVanBang({
      so_vao_so: nextSoVaoSo,
      so_hieu_van_bang: '',
      ma_sinh_vien: '',
      ho_ten: '',
      ngay_sinh: '',
      quyet_dinh_id: quyetDinhId,
    } as VanBangAPI.VanBang);
    setIsEditing(false);
    setIsModalVisible(true);
  }, [quyetDinhs, getNextSoVaoSo]);

  // Initialize form for editing existing văn bằng
  const initEditForm = useCallback((id: number) => {
    const vanBang = vanBangs.find(vb => vb.id === id);
    if (vanBang) {
      setSelectedVanBang(vanBang);
      setIsEditing(true);
      setIsModalVisible(true);
    }
  }, [vanBangs]);

  // Close modal
  const closeModal = useCallback(() => {
    setIsModalVisible(false);
    setSelectedVanBang(null);
  }, []);

  useEffect(() => {
    let isMounted = true; // flag to track if component is mounted
    fetchAllData().then(() => {
      // Optionally check if still mounted before proceeding further
      if (!isMounted) return;
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