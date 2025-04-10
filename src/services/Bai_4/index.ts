import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Địa chỉ JSON Server endpoint
const JSON_SERVER_URL = 'http://localhost:3000';

// Dữ liệu mẫu để sử dụng khi không kết nối được server
const mockClubs = [
  {
    id: 1,
    avatar: "https://via.placeholder.com/100",
    name: "Câu lạc bộ Kỹ năng",
    established: "2020-03-15",
    description: "CLB rèn luyện kỹ năng mềm",
    president: "Nguyễn Văn A",
    active: true
  },
  {
    id: 2,
    avatar: "https://via.placeholder.com/100",
    name: "Câu lạc bộ Công nghệ",
    established: "2019-06-21",
    description: "CLB chuyên về lập trình, công nghệ",
    president: "Trần Thị B",
    active: true
  }
];

const mockApplications = [
  {
    id: 1,
    fullName: "Lê Văn C",
    email: "le.c@example.com",
    phone: "0123456789",
    gender: "Nam",
    address: "Hà Nội",
    strengths: "Giao tiếp",
    clubId: 1,
    reason: "Muốn rèn luyện kỹ năng",
    status: "Pending",
    note: "",
    history: []
  },
  {
    id: 2,
    fullName: "Phạm Thị D",
    email: "pham.d@example.com",
    phone: "0987654321",
    gender: "Nữ",
    address: "TP. Hồ Chí Minh",
    strengths: "Lập trình",
    clubId: 2,
    reason: "Yêu thích công nghệ",
    status: "Approved",
    note: "",
    history: [
      {
        action: "Approved",
        by: "admin",
        timestamp: "2025-04-09T17:00:00Z",
        reason: ""
      }
    ]
  }
];

const mockMembers = [
  {
    id: 1,
    fullName: "Phạm Thị D",
    email: "pham.d@example.com",
    phone: "0987654321",
    gender: "Nữ",
    address: "TP. Hồ Chí Minh",
    strengths: "Lập trình",
    clubId: 2
  }
];

/**
 * Kiểm tra kết nối đến JSON Server
 * @returns Promise<boolean> True nếu kết nối thành công
 */
export const checkServerConnection = async (): Promise<boolean> => {
  try {
    console.log('Đang kiểm tra kết nối đến JSON Server...');
    await axios.get(`${JSON_SERVER_URL}`, { timeout: 2000 });
    console.log('Kết nối đến JSON Server thành công');
    return true;
  } catch (error) {
    console.error('Không thể kết nối đến JSON Server:', error);
    return false;
  }
};

/**
 * Lấy dữ liệu CLB từ API
 * @returns Promise<BaoCaoThongKe.Club[]> Danh sách câu lạc bộ
 */
export const getClubs = async (): Promise<BaoCaoThongKe.Club[]> => {
  try {
    console.log('Đang gọi API: http://localhost:3000/clubs');
    // Gọi API để lấy dữ liệu từ JSON Server
    const res = await axios.get(`${JSON_SERVER_URL}/clubs`);
    console.log('Dữ liệu CLB:', res.data);
    if (Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    } else {
      console.log('Không có dữ liệu, sử dụng dữ liệu mẫu cho CLB');
      return mockClubs;
    }
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu CLB:', error);
    // Nếu có lỗi, sử dụng dữ liệu mẫu
    console.log('Sử dụng dữ liệu mẫu cho CLB');
    return mockClubs;
  }
};

/**
 * Lấy dữ liệu đơn đăng ký từ API
 * @returns Promise<any[]> Danh sách đơn đăng ký
 */
export const getApplications = async (): Promise<any[]> => {
  try {
    console.log('Đang gọi API: http://localhost:3000/applications');
    // Gọi API để lấy dữ liệu từ JSON Server
    const res = await axios.get(`${JSON_SERVER_URL}/applications`);
    console.log('Dữ liệu đơn đăng ký:', res.data);
    if (Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    } else {
      console.log('Không có dữ liệu, sử dụng dữ liệu mẫu cho đơn đăng ký');
      return mockApplications;
    }
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu đơn đăng ký:', error);
    // Nếu có lỗi, sử dụng dữ liệu mẫu
    console.log('Sử dụng dữ liệu mẫu cho đơn đăng ký');
    return mockApplications;
  }
};

/**
 * Lấy dữ liệu thành viên từ API
 * @returns Promise<BaoCaoThongKe.Member[]> Danh sách thành viên
 */
export const getMembers = async (): Promise<BaoCaoThongKe.Member[]> => {
  try {
    console.log('Đang gọi API: http://localhost:3000/members');
    // Gọi API để lấy dữ liệu từ JSON Server
    const res = await axios.get(`${JSON_SERVER_URL}/members`);
    console.log('Dữ liệu thành viên:', res.data);
    if (Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    } else {
      console.log('Không có dữ liệu, sử dụng dữ liệu mẫu cho thành viên');
      return mockMembers;
    }
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu thành viên:', error);
    // Nếu có lỗi, sử dụng dữ liệu mẫu
    console.log('Sử dụng dữ liệu mẫu cho thành viên');
    return mockMembers;
  }
};

/**
 * Tính toán thống kê tổng quan
 * @param clubs Danh sách câu lạc bộ
 * @param applications Danh sách đơn đăng ký
 * @returns ThongKeChung Thống kê tổng quan
 */
export const tinhThongKeChung = (
  clubs: BaoCaoThongKe.Club[], 
  applications: any[]
): BaoCaoThongKe.ThongKeChung => {
  // Đếm số lượng đơn theo trạng thái
  const pending = applications.filter(app => app.status === 'Pending').length;
  const approved = applications.filter(app => app.status === 'Approved').length;
  const rejected = applications.filter(app => app.status === 'Rejected').length;

  return {
    tongCLB: clubs.length,
    tongDonDangKy: applications.length,
    pending,
    approved,
    rejected
  };
};

/**
 * Tính toán thống kê theo từng CLB
 * @param clubs Danh sách câu lạc bộ
 * @param applications Danh sách đơn đăng ký
 * @returns ThongKeTheoCLB[] Thống kê theo từng CLB
 */
export const tinhThongKeTheoCLB = (
  clubs: BaoCaoThongKe.Club[], 
  applications: any[]
): BaoCaoThongKe.ThongKeTheoCLB[] => {
  return clubs.map(club => {
    // Lọc các đơn đăng ký của CLB hiện tại
    const clubApps = applications.filter(app => app.clubId === club.id);
    
    // Đếm số lượng đơn theo trạng thái
    const pending = clubApps.filter(app => app.status === 'Pending').length;
    const approved = clubApps.filter(app => app.status === 'Approved').length;
    const rejected = clubApps.filter(app => app.status === 'Rejected').length;
    
    return {
      clubId: club.id,
      clubName: club.name,
      pending,
      approved,
      rejected
    };
  });
};

/**
 * Hàm chuyển đổi timestamp thành định dạng ngày giờ đẹp
 */
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

/**
 * Xuất danh sách thành viên ra file Excel thực tế
 * @param members Danh sách thành viên cần xuất
 * @param fileName Tên file xuất ra
 * @param clubs Danh sách CLB để hiển thị tên CLB
 * @returns Promise<void>
 */
export const exportExcel = (
  members: BaoCaoThongKe.Member[],
  fileName: string,
  clubs: BaoCaoThongKe.Club[] = []
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Tạo map từ clubId đến tên CLB để tra cứu nhanh
      const clubMap = new Map<number, string>();
      clubs.forEach(club => {
        clubMap.set(club.id, club.name);
      });

      // Chuẩn bị dữ liệu để xuất ra Excel
      const data = members.map(member => ({
        'Mã thành viên': member.id,
        'Họ và tên': member.fullName,
        'Email': member.email,
        'Số điện thoại': member.phone,
        'Giới tính': member.gender,
        'Địa chỉ': member.address,
        'Thế mạnh': member.strengths,
        'Mã CLB': member.clubId,
        'Tên CLB': clubMap.get(member.clubId) || 'Không xác định'
      }));
      
      // Tạo workbook mới
      const workbook = XLSX.utils.book_new();
      
      // Tạo worksheet từ dữ liệu
      const worksheet = XLSX.utils.json_to_sheet(data);
      
      // Định dạng các cột
      const columnWidths = [
        { wch: 12 },  // Mã thành viên
        { wch: 25 },  // Họ và tên
        { wch: 30 },  // Email
        { wch: 15 },  // Số điện thoại
        { wch: 10 },  // Giới tính
        { wch: 40 },  // Địa chỉ
        { wch: 30 },  // Thế mạnh
        { wch: 10 },  // Mã CLB
        { wch: 30 }   // Tên CLB
      ];
      
      worksheet['!cols'] = columnWidths;
      
      // Thêm metadata
      workbook.Props = {
        Title: "Danh sách thành viên",
        Subject: "Báo cáo thống kê CLB",
        Author: "Hệ thống quản lý CLB",
        CreatedDate: new Date()
      };
      
      // Thêm trang thông tin tổng quan
      const summaryData = [
        ['BÁO CÁO DANH SÁCH THÀNH VIÊN'],
        [''],
        ['Thời gian xuất:', formatDate(new Date())],
        ['Tổng số thành viên:', members.length.toString()],
        [''],
        ['Thông tin chi tiết:']
      ];
      
      // Tạo worksheet tổng quan
      const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
      
      // Định dạng tiêu đề
      summaryWs['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 5 } }];
      
      // Thêm worksheet vào workbook
      XLSX.utils.book_append_sheet(workbook, summaryWs, 'Thông tin');
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh sách thành viên');
      
      // Tạo file Excel dưới dạng binary string
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      
      // Chuyển đổi buffer thành Blob
      const blob = new Blob([excelBuffer], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      
      // Lưu file sử dụng FileSaver
      saveAs(blob, fileName);
      
      console.log(`Đã xuất ${members.length} thành viên vào file ${fileName}`);
      resolve();
    } catch (error) {
      console.error('Lỗi khi xuất Excel:', error);
      reject(error);
    }
  });
};