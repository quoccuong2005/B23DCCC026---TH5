import axios from 'axios';
import { message } from 'antd';

// Base URL for the API (json-server)
const API_BASE = 'http://localhost:3000';

/**
 * Get all data from db.json (for development with json-server)
 * @returns All data from db.json
 */
export const getMockData = async () => {
  try {
    // For debugging, check server status first
    console.log('Connecting to mock API at:', API_BASE);
    
    // First, try to connect to the API to confirm json-server is running
    await axios.get(`${API_BASE}`);

    // Then fetch each individual collection separately
    const [vanBangRes, soVanBangRes, quyetDinhRes, cauHinhRes] = await Promise.all([
      axios.get(`${API_BASE}/vanBang`),
      axios.get(`${API_BASE}/soVanBang`),
      axios.get(`${API_BASE}/quyetDinh`),
      axios.get(`${API_BASE}/cauHinh`)
    ]);

    console.log('Data retrieved successfully:');
    console.log('- vanBang count:', vanBangRes.data?.length || 0);
    console.log('- soVanBang count:', soVanBangRes.data?.length || 0);
    console.log('- quyetDinh count:', quyetDinhRes.data?.length || 0);
    console.log('- cauHinh count:', cauHinhRes.data?.length || 0);
    
    return {
      vanBang: vanBangRes.data || [],
      soVanBang: soVanBangRes.data || [],
      quyetDinh: quyetDinhRes.data || [],
      cauHinh: cauHinhRes.data || []
    };
  } catch (error) {
    console.error('Failed to fetch mock data:', error);
    message.error('Không thể kết nối đến server dữ liệu. Vui lòng đảm bảo:');
    message.error('1. json-server đang chạy ở http://localhost:3000');
    message.error('2. db.json không có lỗi cú pháp và không chứa comments');
    
    // Return empty arrays as fallback
    return {
      vanBang: [],
      soVanBang: [],
      quyetDinh: [],
      cauHinh: []
    };
  }
};

/**
 * Get all văn bằng records
 * @returns Array of văn bằng records
 */
export const getVanBang = async () => {
  try {
    const response = await axios.get(`${API_BASE}/vanBang`);
    return response.data;
  } catch (error) {
    console.error('Error fetching vanBang:', error);
    message.error('Không thể lấy dữ liệu văn bằng');
    return [];
  }
};

/**
 * Create a new văn bằng record
 * @param data VanBang data to add
 * @returns Created văn bằng record
 */
export const createVanBang = async (data: any) => {
  try {
    const response = await axios.post(`${API_BASE}/vanBang`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating vanBang:', error);
    message.error('Không thể tạo văn bằng mới');
    throw error;
  }
};

/**
 * Update an existing văn bằng record
 * @param id ID of the văn bằng
 * @param data Updated văn bằng data
 * @returns Updated văn bằng record
 */
export const updateVanBang = async (id: number, data: any) => {
  try {
    const response = await axios.put(`${API_BASE}/vanBang/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating vanBang:', error);
    message.error('Không thể cập nhật văn bằng');
    throw error;
  }
};

/**
 * Delete a văn bằng record
 * @param id ID of the văn bằng to delete
 * @returns Result of the delete operation
 */
export const deleteVanBang = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE}/vanBang/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting vanBang:', error);
    message.error('Không thể xóa văn bằng');
    throw error;
  }
};

export const getSoVanBang = async () => {
  try {
    const response = await axios.get(`${API_BASE}/soVanBang`);
    return response.data;
  } catch (error) {
    console.error('Error fetching soVanBang:', error);
    return [];
  }
};

export const getQuyetDinh = async () => {
  try {
    const response = await axios.get(`${API_BASE}/quyetDinh`);
    return response.data;
  } catch (error) {
    console.error('Error fetching quyetDinh:', error);
    return [];
  }
};

export const getCauHinh = async () => {
  try {
    const response = await axios.get(`${API_BASE}/cauHinh`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cauHinh:', error);
    return [];
  }
};