import { useState } from 'react';
import { initializeData, getDataKhoaHoc } from '@/services/QuanLyKhoaHoc';

export default () => {
  const [data, setData] = useState<QuanLyKhoaHoc.KhoaHoc[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedKhoaHoc, setSelectedKhoaHoc] = useState<QuanLyKhoaHoc.KhoaHoc | undefined>(undefined);
  
  // Search and filter states
  const [searchText, setSearchText] = useState<string>('');
  const [filterGiangVien, setFilterGiangVien] = useState<string>('');
  const [filterTrangThai, setFilterTrangThai] = useState<QuanLyKhoaHoc.TrangThai | ''>('');
  const [sortOrder, setSortOrder] = useState<'ascend' | 'descend' | undefined>(undefined);

  const loadData = () => {
    const khoaHocData = initializeData();
    setData(khoaHocData);
  };

  const saveData = (newData: QuanLyKhoaHoc.KhoaHoc[]) => {
    localStorage.setItem('khoaHocData', JSON.stringify(newData));
    setData(newData);
  };

  const addKhoaHoc = (khoaHoc: QuanLyKhoaHoc.KhoaHoc) => {
    const newData = [khoaHoc, ...data];
    saveData(newData);
  };

  const updateKhoaHoc = (khoaHoc: QuanLyKhoaHoc.KhoaHoc) => {
    const index = data.findIndex(item => item.id === khoaHoc.id);
    if (index !== -1) {
      const newData = [...data];
      newData[index] = khoaHoc;
      saveData(newData);
    }
  };

  const deleteKhoaHoc = (id: string) => {
    const newData = data.filter(item => item.id !== id);
    saveData(newData);
  };

  const checkDuplicate = (tenKhoaHoc: string, currentId?: string) => {
    return data.some(item => 
      item.tenKhoaHoc === tenKhoaHoc && 
      item.id !== currentId
    );
  };

  const generateId = () => {
    const prefix = 'KH';
    const lastId = data.length > 0 
      ? parseInt(data[0].id.replace(prefix, '')) 
      : 0;
    const newId = lastId + 1;
    return `${prefix}${newId.toString().padStart(3, '0')}`;
  };

  return {
    data,
    visible,
    setVisible,
    isEdit,
    setIsEdit,
    selectedKhoaHoc,
    setSelectedKhoaHoc,
    loadData,
    addKhoaHoc,
    updateKhoaHoc,
    deleteKhoaHoc,
    checkDuplicate,
    generateId,
    searchText,
    setSearchText,
    filterGiangVien,
    setFilterGiangVien,
    filterTrangThai,
    setFilterTrangThai,
    sortOrder,
    setSortOrder
  };
};