/**
 * Định nghĩa các kiểu dữ liệu cho module Báo cáo thống kê
 * Module này sử dụng để báo cáo số lượng đơn đăng ký của các CLB
 * và xuất danh sách thành viên ra file Excel
 */
declare module BaoCaoThongKe {
  // Các loại trạng thái đơn đăng ký
  export type TrangThai = 'Pending' | 'Approved' | 'Rejected';

  // Thống kê tổng quan
  export interface ThongKeChung {
    tongCLB: number;
    tongDonDangKy: number;
    pending: number;
    approved: number;
    rejected: number;
  }

  // Thống kê chi tiết theo từng CLB
  export interface ThongKeTheoCLB {
    clubId: number;
    clubName: string;
    pending: number;
    approved: number;
    rejected: number;
  }

  // Thông tin câu lạc bộ
  export interface Club {
    id: number;
    name: string;
    avatar: string;
    established: string;
    description: string;
    president: string;
    active: boolean;
  }

  // Thông tin thành viên
  export interface Member {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    gender: string;
    address: string;
    strengths: string;
    clubId: number;
  }
}