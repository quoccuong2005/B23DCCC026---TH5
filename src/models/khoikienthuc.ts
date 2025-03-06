import { useState } from "react";
import { KhoiKienThucService } from "../services/khoikienthuc";
import { KhoiKienThuc } from "./qlkt";

export default () => {
    const [data, setData] = useState<KhoiKienThuc[]>([]);
    const [tenKhoi, setTenKhoi] = useState("");

    const getDataKhoiKienThuc = async () => {
        const res = await KhoiKienThucService.getAll();
        setData(res);
    };

    const addKhoiKienThuc = async () => {
        if (!tenKhoi) return;
        const newKhoi = await KhoiKienThucService.add(tenKhoi);
        if (newKhoi) {
            setData([...data, newKhoi]);
            setTenKhoi("");
        }
    };

    const deleteKhoiKienThuc = async (id: string) => {
        const success = await KhoiKienThucService.delete(id);
        if (success) {
            setData(data.filter((item) => item.id !== id));
        }
    };

    return {
        data,
        tenKhoi,
        setTenKhoi,
        getDataKhoiKienThuc,
        addKhoiKienThuc,
        deleteKhoiKienThuc
    };
};
