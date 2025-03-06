import axios from "axios";
import { MonHoc } from "../models/lmh";

const API_BASE = "http://localhost:3000/monHoc";

export const MonHocService = {
    async getAll(): Promise<MonHoc[]> {
        try {
            const res = await axios.get(API_BASE);
            return res.data;
        } catch (error) {
            console.error("Lỗi khi lấy danh sách Môn Học:", error);
            return [];
        }
    },

    async add(monHoc: Omit<MonHoc, "id">): Promise<MonHoc | null> {
        try {
            const res = await axios.post(API_BASE, monHoc);
            return res.data;
        } catch (error) {
            console.error("Lỗi khi thêm Môn Học:", error);
            return null;
        }
    },

    async update(id: string, monHoc: Omit<MonHoc, "id">): Promise<boolean> {
        try {
            await axios.put(`${API_BASE}/${id}`, monHoc);
            return true;
        } catch (error) {
            console.error("Lỗi khi cập nhật Môn Học:", error);
            return false;
        }
    },

    async delete(id: string): Promise<boolean> {
        try {
            await axios.delete(`${API_BASE}/${id}`);
            return true;
        } catch (error) {
            console.error("Lỗi khi xóa Môn Học:", error);
            return false;
        }
    }
};
