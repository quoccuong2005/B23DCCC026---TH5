declare namespace VanBangAPI {
  export interface VanBang {
    id?: number;
    so_vao_so: number;
    so_hieu_van_bang: string;
    ma_sinh_vien: string;
    ho_ten: string;
    ngay_sinh: string;
    quyet_dinh_id: number;
    // Additional dynamic fields (e.g., diem_trung_binh, xep_loai, etc.)
    [key: string]: any;
  }
  export interface SoVanBang {
    id: number;
    nam: number;
    so_vao_so: number;
  }
  export interface QuyetDinh {
    id: number;
    so_quyet_dinh: string;
    ngay_ban_hanh: string;
    trich_yeu: string;
    so_van_bang_id: number;
  }
  export interface CauHinh {
    id: number;
    ten_truong: string;
    kieu_du_lieu: 'String' | 'Number' | 'Date';
  }
}
