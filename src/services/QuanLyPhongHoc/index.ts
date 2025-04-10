// Mock data for people in charge
export const danhSachNguoiPhuTrach: QuanLyPhongHoc.NguoiPhuTrach[] = [
  { id: '1', name: 'Nguyễn Văn A' },
  { id: '2', name: 'Trần Thị B' },
  { id: '3', name: 'Lê Văn C' },
  { id: '4', name: 'Phạm Thị D' },
  { id: '5', name: 'Hoàng Văn E' },
];

export const loaiPhong: QuanLyPhongHoc.LoaiPhong[] = [
  'Lý thuyết',
  'Thực hành',
  'Hội trường',
];

// Get data from localStorage
export const getDataPhongHoc = (): QuanLyPhongHoc.PhongHoc[] => {
  const data = localStorage.getItem('phongHocData');
  if (data) {
    return JSON.parse(data);
  }
  return [];
};

// Initialize mock data if empty
export const initializeData = () => {
  const existingData = getDataPhongHoc();
  if (existingData.length === 0) {
    const mockData: QuanLyPhongHoc.PhongHoc[] = [
      {
        maPhong: 'P001',
        tenPhong: 'Phòng học A1.01',
        soChoNgoi: 60,
        loaiPhong: 'Lý thuyết',
        nguoiPhuTrach: danhSachNguoiPhuTrach[0],
      },
      {
        maPhong: 'P002',
        tenPhong: 'Phòng thực hành B2.03',
        soChoNgoi: 40,
        loaiPhong: 'Thực hành',
        nguoiPhuTrach: danhSachNguoiPhuTrach[1],
      },
      {
        maPhong: 'P003',
        tenPhong: 'Hội trường lớn',
        soChoNgoi: 200,
        loaiPhong: 'Hội trường',
        nguoiPhuTrach: danhSachNguoiPhuTrach[2],
      },
    ];
    localStorage.setItem('phongHocData', JSON.stringify(mockData));
    return mockData;
  }
  return existingData;
};