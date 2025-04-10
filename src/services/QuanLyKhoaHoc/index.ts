// Mock data for instructors
export const danhSachGiangVien: QuanLyKhoaHoc.GiangVien[] = [
  { id: '1', ten: 'Nguyễn Minh Anh', chuyenNganh: 'Công nghệ thông tin' },
  { id: '2', ten: 'Trần Văn Bình', chuyenNganh: 'Khoa học máy tính' },
  { id: '3', ten: 'Lê Thị Cẩm', chuyenNganh: 'Phát triển phần mềm' },
  { id: '4', ten: 'Phạm Đức Duy', chuyenNganh: 'An toàn thông tin' },
  { id: '5', ten: 'Hoàng Thị Effy', chuyenNganh: 'Thiết kế UI/UX' },
];

export const trangThaiKhoaHoc: QuanLyKhoaHoc.TrangThai[] = [
  'Đang mở',
  'Đã kết thúc',
  'Tạm dừng',
];

// Get data from localStorage
export const getDataKhoaHoc = (): QuanLyKhoaHoc.KhoaHoc[] => {
  const data = localStorage.getItem('khoaHocData');
  if (data) {
    return JSON.parse(data);
  }
  return [];
};

// Initialize mock data if empty
export const initializeData = () => {
  const existingData = getDataKhoaHoc();
  if (existingData.length === 0) {
    const mockData: QuanLyKhoaHoc.KhoaHoc[] = [
      {
        id: 'KH001',
        tenKhoaHoc: 'Lập trình JavaScript cơ bản',
        giangVien: danhSachGiangVien[0],
        soLuongHocVien: 45,
        moTa: '<p>Khóa học giúp học viên làm quen với JavaScript và các khái niệm cơ bản về lập trình web.</p>',
        trangThai: 'Đang mở',
      },
      {
        id: 'KH002',
        tenKhoaHoc: 'React.js nâng cao',
        giangVien: danhSachGiangVien[1],
        soLuongHocVien: 30,
        moTa: '<p>Khóa học chuyên sâu về React.js, học cách xây dựng các ứng dụng phức tạp với hooks và Redux.</p>',
        trangThai: 'Đang mở',
      },
      {
        id: 'KH003',
        tenKhoaHoc: 'Bảo mật ứng dụng web',
        giangVien: danhSachGiangVien[3],
        soLuongHocVien: 0,
        moTa: '<p>Khóa học về các nguyên tắc bảo mật và cách phòng chống các cuộc tấn công phổ biến.</p>',
        trangThai: 'Tạm dừng',
      },
      {
        id: 'KH004',
        tenKhoaHoc: 'UX/UI Design cho người mới bắt đầu',
        giangVien: danhSachGiangVien[4],
        soLuongHocVien: 20,
        moTa: '<p>Khóa học giúp bạn hiểu các nguyên tắc thiết kế và tạo ra giao diện người dùng hấp dẫn.</p>',
        trangThai: 'Đã kết thúc',
      },
    ];
    localStorage.setItem('khoaHocData', JSON.stringify(mockData));
    return mockData;
  }
  return existingData;
};