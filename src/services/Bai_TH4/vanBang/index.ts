import axios from 'axios';

const API_BASE = 'http://localhost:3000'; // json-server endpoint

// For development, get all needed data from db.json
export const getMockData = async () => {
  // You can use axios to fetch the entire db.json if your json-server is configured that way.
  const response = await axios.get(`${API_BASE}`);
  return response.data;
};

export const getVanBang = async () => {
  const response = await axios.get(`${API_BASE}/vanBang`);
  return response.data;
};

export const createVanBang = async (data: any) => {
  const response = await axios.post(`${API_BASE}/vanBang`, data);
  return response.data;
};

export const updateVanBang = async (id: number, data: any) => {
  const response = await axios.put(`${API_BASE}/vanBang/${id}`, data);
  return response.data;
};

export const deleteVanBang = async (id: number) => {
  const response = await axios.delete(`${API_BASE}/vanBang/${id}`);
  return response.data;
};

export const getSoVanBang = async () => {
  const response = await axios.get(`${API_BASE}/soVanBang`);
  return response.data;
};

export const getQuyetDinh = async () => {
  const response = await axios.get(`${API_BASE}/quyetDinh`);
  return response.data;
};

export const getCauHinh = async () => {
  const response = await axios.get(`${API_BASE}/cauHinh`);
  return response.data;
};