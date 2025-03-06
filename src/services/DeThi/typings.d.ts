import CauTrucDeThi from "@/pages/Bai2/CauTruc";

declare module MonHoc {
	export interface Record {
		id: number;
		maMon: string;
		tenMon: string;
		soTinChi: number;
		khoiKienThucId: number;
	}
}

declare module CauTrucDeThiInterFace {
	export interface Record {
		id: number;
		name: string,
		monHoc: string;
		khoiKienThuc: string;
		de: number;
		trungBinh: number;
		kho: number;
	}
}


declare module DeThiInterFace {
	export interface Record {
		id: string;
		name: string,
		ngayTao: string;
		monHoc: string;
		tenCauTruc: string;
		cauHoi: any;	
	}
}