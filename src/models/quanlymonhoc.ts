import { useState } from "react";
import { MonHocService } from "../services/quanlymonhoc";
import { MonHoc } from "./lmh";

export default () => {
    const [data, setData] = useState<MonHoc[]>([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [row, setRow] = useState<MonHoc | null>(null);

    const getDataMonHoc = async () => {
        const res = await MonHocService.getAll();
        setData(res);
    };

    const addMonHoc = async (monHoc: Omit<MonHoc, "id">) => {
        const newMonHoc = await MonHocService.add(monHoc);
        if (newMonHoc) {
            setData([...data, newMonHoc]);
        }
    };

    const updateMonHoc = async (id: string, monHoc: Omit<MonHoc, "id">) => {
        const success = await MonHocService.update(id, monHoc);
        if (success) {
            setData(data.map(item => (item.id === id ? { ...item, ...monHoc } : item)));
        }
    };

    const deleteMonHoc = async (id: string) => {
        const success = await MonHocService.delete(id);
        if (success) {
            setData(data.filter((item) => item.id !== id));
        }
    };

    return {
        data,
        visible,
        setVisible,
        row,
        setRow,
        isEdit,
        setIsEdit,
        getDataMonHoc,
        addMonHoc,
        updateMonHoc,
        deleteMonHoc,
    };
};
