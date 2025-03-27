import type { DiplomaInfo } from './typing';

export interface DiplomaSearchParams {
    so_hieu_van_bang?: string;
    so_vao_so?: number;
    ma_sinh_vien?: string;
    ho_ten?: string;
    ngay_sinh?: string;
}

export async function fetchDiplomaInfo(params: DiplomaSearchParams): Promise<DiplomaInfo[]> {
    const response = await fetch('http://localhost:5000/vanBang');
    const data = await response.json();


    return data.filter((item: DiplomaInfo) => {
        const conditions = [
            params.so_hieu_van_bang ? item.so_hieu_van_bang.includes(params.so_hieu_van_bang) : true,
            params.so_vao_so ? item.so_vao_so === params.so_vao_so : true,
            params.ma_sinh_vien ? item.ma_sinh_vien.includes(params.ma_sinh_vien) : true,
            params.ho_ten ? item.ho_ten.includes(params.ho_ten) : true,
            params.ngay_sinh ? item.ngay_sinh === params.ngay_sinh : true,
        ];
        return conditions.every(Boolean);
    });
}

export async function fetchSearchStats(): Promise<Record<string, number>> {
    const response = await fetch('http://localhost:5000/traCuuVanBang/tongSoLuotTraCuuTheoQuyetDinh');
    return response.json();
}