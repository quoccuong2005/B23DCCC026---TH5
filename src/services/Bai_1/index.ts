import request from 'umi-request';

const API_URL = 'http://localhost:3001';

export async function getClubs() {
  return request(`${API_URL}/clubs`);
}

export async function getMembers(clubId: number) {
  return request(`${API_URL}/members?clubId=${clubId}`);
}

export async function addClub(data: any) {
  return request(`${API_URL}/clubs`, {
    method: 'POST',
    data,
  });
}

export async function updateClub(id: number, data: any) {
  return request(`${API_URL}/clubs/${id}`, {
    method: 'PUT',
    data,
  });
}

export async function deleteClub(id: number) {
  return request(`${API_URL}/clubs/${id}`, {
    method: 'DELETE',
  });
}