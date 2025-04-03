import { useState } from 'react';
import { initializeData, getDataPhongHoc } from '@/services/QuanLyPhongHoc';

export default () => {
  const [data, setData] = useState<QuanLyPhongHoc.PhongHoc[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedPhongHoc, setSelectedPhongHoc] = useState<QuanLyPhongHoc.PhongHoc | undefined>(undefined);
  
  // Search and filter states
  const [searchText, setSearchText] = useState<string>('');
  const [filterLoaiPhong, setFilterLoaiPhong] = useState<QuanLyPhongHoc.LoaiPhong | ''>('');
  const [filterNguoiPhuTrach, setFilterNguoiPhuTrach] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'ascend' | 'descend' | undefined>(undefined);

  const loadData = () => {
    const phongHocData = initializeData();
    setData(phongHocData);
  };

  const saveData = (newData: QuanLyPhongHoc.PhongHoc[]) => {
    localStorage.setItem('phongHocData', JSON.stringify(newData));
    setData(newData);
  };

  const addPhongHoc = (phongHoc: QuanLyPhongHoc.PhongHoc) => {
    const newData = [phongHoc, ...data];
    saveData(newData);
  };

  const updatePhongHoc = (phongHoc: QuanLyPhongHoc.PhongHoc) => {
    const index = data.findIndex(item => item.maPhong === phongHoc.maPhong);
    if (index !== -1) {
      const newData = [...data];
      newData[index] = phongHoc;
      saveData(newData);
    }
  };

  const deletePhongHoc = (maPhong: string) => {
    const newData = data.filter(item => item.maPhong !== maPhong);
    saveData(newData);
  };

  const checkDuplicate = (maPhong: string, tenPhong: string, currentMaPhong?: string) => {
    return data.some(item => 
      (item.maPhong === maPhong && item.maPhong !== currentMaPhong) || 
      (item.tenPhong === tenPhong && item.maPhong !== currentMaPhong)
    );
  };

  return {
    data,
    visible,
    setVisible,
    isEdit,
    setIsEdit,
    selectedPhongHoc,
    setSelectedPhongHoc,
    loadData,
    addPhongHoc,
    updatePhongHoc,
    deletePhongHoc,
    checkDuplicate,
    searchText,
    setSearchText,
    filterLoaiPhong,
    setFilterLoaiPhong,
    filterNguoiPhuTrach,
    setFilterNguoiPhuTrach,
    sortOrder,
    setSortOrder
  };
};