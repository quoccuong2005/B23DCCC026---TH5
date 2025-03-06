import axios from 'axios';

export const getMonHocApi = async () => {
	const res = await axios.get('http://localhost:3000/monHoc');
	return res;
};

export const getKhoiKienThucApi = async () => {	
	const res = await axios.get('http://localhost:3000/khoiKienThuc');
	return res;
}

export const getCauTrucDeThiApi = async () => {	
	const res = await axios.get('http://localhost:3000/cauTrucDeThi');
	return res;
}

export const getDeThiApi = async () => {
	const res = await axios.get('http://localhost:3000/deThi');
	return res;
}
export const getCauHoiApi = async () => {	
	const res = await axios.get('http://localhost:3000/cauHoi');
	return res;
}