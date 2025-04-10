import { useState, useCallback } from 'react';
import { getClubs, getApplications, getMembers, tinhThongKeChung, tinhThongKeTheoCLB, exportExcel } from '@/services/Bai_4';
import { message } from 'antd';

/**
 * Model quản lý state và logic nghiệp vụ cho module Báo cáo thống kê
 * Sử dụng hooks để quản lý state và các hàm xử lý
 */
export default () => {
  // Trạng thái dữ liệu
  const [clubs, setClubs] = useState<BaoCaoThongKe.Club[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [members, setMembers] = useState<BaoCaoThongKe.Member[]>([]);
  
  // Trạng thái thống kê
  const [thongKeChung, setThongKeChung] = useState<BaoCaoThongKe.ThongKeChung>({
    tongCLB: 0,
    tongDonDangKy: 0,
    pending: 0,
    approved: 0,
    rejected: 0 
  });
  const [thongKeTheoCLB, setThongKeTheoCLB] = useState<BaoCaoThongKe.ThongKeTheoCLB[]>([]);
  
  // Trạng thái xuất Excel
  const [exportLoading, setExportLoading] = useState<boolean>(false);
  const [selectedClubId, setSelectedClubId] = useState<number | undefined>(undefined);
  const [exportAll, setExportAll] = useState<boolean>(true);
  
  // Trạng thái modal xuất Excel
  const [visible, setVisible] = useState<boolean>(false);

  /**
   * Tải dữ liệu từ API và tính toán thống kê
   * Được gọi khi component mount
   */
  const loadData = useCallback(async () => {
    try {
      // Lấy dữ liệu từ API
      const clubsData = await getClubs();
      const applicationsData = await getApplications();
      const membersData = await getMembers();
      
      // Kiểm tra dữ liệu trước khi cập nhật state
      if (clubsData && applicationsData) {
        // Cập nhật state
        setClubs(clubsData);
        setApplications(applicationsData);
        setMembers(membersData);
        
        // Tính toán thống kê
        const generalStats = tinhThongKeChung(clubsData, applicationsData);
        const clubStats = tinhThongKeTheoCLB(clubsData, applicationsData);
        
        setThongKeChung(generalStats);
        setThongKeTheoCLB(clubStats);
      }
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
      message.error('Không thể tải dữ liệu báo cáo');
    }
  }, []);

  /**
   * Xuất danh sách thành viên ra file Excel
   * Được gọi khi người dùng nhấn nút xuất Excel
   */
  const handleExportExcel = useCallback(async () => {
  setExportLoading(true);
  try {
    // Chuẩn bị dữ liệu
    let dataExport = exportAll 
      ? members 
      : members.filter(m => m.clubId === selectedClubId);
    
    // Kiểm tra có dữ liệu không
    if (dataExport.length === 0) {
      throw new Error('Không có thành viên nào để xuất');
    }
    
    // Tạo tên file
    const clubName = selectedClubId ? 
      clubs.find(c => c.id === selectedClubId)?.name || selectedClubId : 'all';
    
    const fileName = exportAll ? 
      'Danh_sach_thanh_vien.xlsx' : 
      `Thanh_vien_CLB_${clubName}.xlsx`;
    
    // Gọi hàm xuất file với clubs để hiển thị tên CLB
    await exportExcel(dataExport, fileName, clubs);
    message.success(`Đã xuất file ${fileName}`);
  } catch (error: any) {
    message.error(error.message || 'Lỗi khi xuất file Excel');
  } finally {
    setExportLoading(false);
  }
}, [clubs, exportAll, members, selectedClubId]);

  // Trả về các biến và hàm cần thiết cho components
  return {
    clubs,
    applications,
    members,
    thongKeChung,
    thongKeTheoCLB,
    loadData,
    exportLoading,
    selectedClubId,
    setSelectedClubId,
    exportAll,
    setExportAll,
    handleExportExcel,
    visible,
    setVisible
  };
};