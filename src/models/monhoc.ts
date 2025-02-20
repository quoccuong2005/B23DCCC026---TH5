import { set } from 'lodash';
import { useState } from 'react';

export default () => {
    const [data, setData] = useState<{ id: number; name: string }[]>([]);
    const [data2, setData2] = useState([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [row, setRow] = useState<MonHoc.Record>();

    const getTienDoHocTap = async () => {
        const dataLocal: any = JSON.parse(localStorage.getItem('tien_do') as any);
        if (dataLocal?.length) {
            setData2(dataLocal);
        }
    };
    const getMonHoc = async () => {
        const dataLocal: any = JSON.parse(localStorage.getItem('study_subjects') as any);
        if (dataLocal?.length) {
            setData(dataLocal);
        }else {
            const a = [
                {
                    id: 1,
                    name: 'Toán',
                },
                {
                    id: 2,
                    name: 'Vật lý',
                },
                {
                    id: 3,
                    name: 'Hóa học',
                },
                {
                    id: 4,
                    name: 'Sinh học',
                },
                {
                    id: 5,
                    name: 'Lịch sử',
                },
                {
                    id: 6,
                    name: 'Địa lý',
                },
                {
                    id: 7,
                    name: 'Ngữ văn',
                },
                {
                    id: 8,
                    name: 'Tiếng Anh',
                },
            ]
            setData(a);
        }
    }

    return {
        data,
        data2,
        visible,
        setVisible,
        row,
        setRow,
        isEdit,
        setIsEdit,
        setData,
        getMonHoc,
        getTienDoHocTap,
    };
};
