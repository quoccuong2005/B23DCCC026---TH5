import axios from "axios";
import { KhoiKienThuc } from "../models/qlkt";

const API_BASE = "http://localhost:3000/khoiKienThuc";

export const KhoiKienThucService = {
    async getAll(): Promise<KhoiKienThuc[]> {
        try {
            const res = await axios.get(API_BASE);
            return res.data;
        } catch (error) {
            console.error("Lỗi khi lấy danh sách Khối Kiến Thức:", error);
            return [];
        }
    },

    async add(tenKhoi: string): Promise<KhoiKienThuc | null> {
        try {
            const res = await axios.post(API_BASE, { tenKhoi });
            return res.data;
        } catch (error) {
            console.error("Lỗi khi thêm Khối Kiến Thức:", error);
            return null;
        }
    },

    async delete(id: string): Promise<boolean> {
        try {
            await axios.delete(`${API_BASE}/${id}`);
            return true;
        } catch (error) {
            console.error("Lỗi khi xóa Khối Kiến Thức:", error);
            return false;
        }
    }
};
