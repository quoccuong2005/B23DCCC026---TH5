import { useState } from 'react';
import { getMonHocApi } from '@/services/DeThi';
import { getKhoiKienThucApi } from '@/services/DeThi';
import { getCauTrucDeThiApi } from '@/services/DeThi';
import { getCauHoiApi } from '@/services/DeThi';
import { getDeThiApi } from '@/services/DeThi';

export default () => {
    const [data, setData] = useState<any[]>([]);
    const [data2, setData2] = useState([]); //Dữ liệu tiến độ học tập
    const [data3, setData3] = useState<any[]>([]); //Dữ liệu khối kiến thức
    const [data4, setData4] = useState<any[]>([]); //Dữ liệu cấu trúc đề thi
    const [data5, setData5] = useState<any[]>([]); //Dữ liệu câu hỏi
    const [data6, setData6] = useState<any[]>([]); //Dữ liệu đề thi

    const [visible, setVisible] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [row, setRow] = useState<MonHoc.Record>();

    const getTienDoHocTap = async () => {
        const dataLocal: any = JSON.parse(localStorage.getItem('tien_do') as any);
        if (dataLocal?.length) {
            setData2(dataLocal);
        }
    };
    const getKhoiKienThuc = async () => {
        const res = await getKhoiKienThucApi(); //Lấy danh sách khối kiến thức từ api
        setData3(res?.data ?? []);
    }
    const getMonHoc = async () => {
        const res = await getMonHocApi(); //Lấy danh sách môn học từ api
        setData(res?.data ?? []);
    }
    const getCauTruc = async () => {
        const res = await getCauTrucDeThiApi(); //Lấy danh sách cấu trúc đề thi từ api
        setData4(res?.data ?? []);
    }

    const getCauHoi = async () => {
        const res = await getCauHoiApi(); //Lấy danh sách câu hỏi từ api
        setData5(res?.data ?? []);
    }

    const getDeThi = async () => {
        const res = await getDeThiApi(); //Lấy danh sách đề thi từ api
        setData6(res?.data ?? []);
    }

    return {
        data,
        data2,
        data3,
        data4,
        data5,
        data6,
        visible,
        setVisible,
        row,
        setRow,
        isEdit,
        setIsEdit,
        setData,
        getMonHoc,
        getTienDoHocTap,
        getKhoiKienThuc,
        getCauTruc,
        getCauHoi,
        getDeThi
    };
};
