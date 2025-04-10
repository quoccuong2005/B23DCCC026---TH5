import axios from 'axios';

const API_URL = 'http://localhost:8001'; // JSON Server URL

// API cho quản lý CLB
export const getClubs = async () => {
  const res = await axios.get(`${API_URL}/clubs`);
  return res.data;
};

export const getClub = async (id: number) => {
  const res = await axios.get(`${API_URL}/clubs/${id}`);
  return res.data;
};

export const createClub = async (club: Omit<ClubManagement.Club, 'id'>) => {
  const res = await axios.post(`${API_URL}/clubs`, club);
  return res.data;
};

export const updateClub = async (id: number, club: Partial<ClubManagement.Club>) => {
  const res = await axios.patch(`${API_URL}/clubs/${id}`, club);
  return res.data;
};

export const deleteClub = async (id: number) => {
  const res = await axios.delete(`${API_URL}/clubs/${id}`);
  return res.data;
};

// API cho quản lý đơn đăng ký
export const getApplications = async () => {
  const res = await axios.get(`${API_URL}/applications`);
  return res.data;
};

export const getApplication = async (id: number) => {
  const res = await axios.get(`${API_URL}/applications/${id}`);
  return res.data;
};

export const createApplication = async (application: Omit<ClubManagement.Application, 'id'>) => {
  const res = await axios.post(`${API_URL}/applications`, application);
  return res.data;
};

export const updateApplication = async (id: number, application: Partial<ClubManagement.Application>) => {
  const res = await axios.patch(`${API_URL}/applications/${id}`, application);
  return res.data;
};

export const deleteApplication = async (id: number) => {
  const res = await axios.delete(`${API_URL}/applications/${id}`);
  return res.data;
};

// API cho quản lý thành viên
export const getMembers = async (clubId?: number) => {
  const url = clubId ? `${API_URL}/members?clubId=${clubId}` : `${API_URL}/members`;
  const res = await axios.get(url);
  return res.data;
};

export const createMember = async (member: Omit<ClubManagement.Member, 'id'>) => {
  const res = await axios.post(`${API_URL}/members`, member);
  return res.data;
};

export const updateMember = async (id: number, member: Partial<ClubManagement.Member>) => {
  const res = await axios.patch(`${API_URL}/members/${id}`, member);
  return res.data;
};

export const deleteMember = async (id: number) => {
  const res = await axios.delete(`${API_URL}/members/${id}`);
  return res.data;
};