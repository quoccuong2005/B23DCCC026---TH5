declare module QuanLyKhoaHoc {
  export type TrangThai = 'Đang mở' | 'Đã kết thúc' | 'Tạm dừng';

  export interface GiangVien {
    id: string;
    ten: string;
    chuyenNganh: string;
  }

  export interface KhoaHoc {
    id: string;
    tenKhoaHoc: string;
    giangVien: GiangVien;
    soLuongHocVien: number;
    moTa: string;
    trangThai: TrangThai;
  }
}