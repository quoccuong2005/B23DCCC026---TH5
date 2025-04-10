declare module QuanLyPhongHoc {
  export type LoaiPhong = 'Lý thuyết' | 'Thực hành' | 'Hội trường';

  export interface NguoiPhuTrach {
    id: string;
    name: string;
  }

  export interface PhongHoc {
    maPhong: string;
    tenPhong: string;
    soChoNgoi: number;
    loaiPhong: LoaiPhong;
    nguoiPhuTrach: NguoiPhuTrach;
  }
}