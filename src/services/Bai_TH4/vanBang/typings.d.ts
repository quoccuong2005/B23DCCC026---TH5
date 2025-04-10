import { Moment } from 'moment';

export namespace VanBangAPI {
  /**
   * Văn bằng record structure matching db.json
   */
  export interface VanBang {
    id?: number;
    so_vao_so: number;
    so_hieu_van_bang: string;
    ma_sinh_vien: string;
    ho_ten: string;
    ngay_sinh: string | Moment; // Can be string or Moment for DatePicker
    diem_trung_binh: number;
    xep_loai: string;
    he_dao_tao: string;
    noi_sinh: string;
    dan_toc: string;
    quyet_dinh_id: number;
    [key: string]: any; // For any dynamic fields
  }
  
  /**
   * Sổ văn bằng record structure matching db.json
   */
  export interface SoVanBang {
    id: number;
    nam: number;
    so_vao_so: number;
  }
  
  /**
   * Quyết định record structure matching db.json
   */
  export interface QuyetDinh {
    id: number;
    so_quyet_dinh: string;
    ngay_ban_hanh: string;
    trich_yeu: string;
    so_van_bang_id: number;
  }
  
  /**
   * Cấu hình field record structure matching db.json
   */
  export interface CauHinh { 
    id?: number;
    ten_truong: string;
    kieu_du_lieu: 'String' | 'Number' | 'Date';
  }
  
  /**
   * Model type for văn bằng functionality
   */
  export interface VanBangModelType {
    vanBangs: VanBang[];
    soVanBangs?: SoVanBang[];
    quyetDinhs?: QuyetDinh[];
    cauHinhs: CauHinh[];
    selectedVanBang: VanBang | null;
    isModalVisible: boolean;
    isEditing: boolean;
    loading: boolean;
    fetchAllData: () => Promise<void>;
    getNextSoVaoSo: (soVanBangId: number) => number;
    addVanBang: (data: VanBang) => Promise<any>;
    updateVanBangData: (id: number, data: VanBang) => Promise<any>;
    deleteVanBangData: (id: number) => Promise<void>;
    initAddForm: (quyetDinhId: number) => void;
    initEditForm: (id: number) => void;
    closeModal: () => void;
  }
}