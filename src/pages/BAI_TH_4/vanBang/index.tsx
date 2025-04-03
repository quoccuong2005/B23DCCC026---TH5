import React, { useEffect } from 'react';
import { Button, Table, message, Spin } from 'antd';
import moment from 'moment';
import { useModel } from 'umi';
import VanBangForm from './Form';
import { VanBangAPI } from '../../../services/Bai_TH4/vanBang/typings';

/**
 * Văn Bằng Page - Displays list of văn bằng records with CRUD operations
 */
const VanBangPage: React.FC = () => {
  // Get data and methods from the model
  const model = useModel('bai_th_4.vanBang') as VanBangAPI.VanBangModelType;
  const { 
    vanBangs, 
    loading, 
    initAddForm, 
    initEditForm, 
    deleteVanBangData, 
    fetchAllData, 
    isModalVisible 
  } = model;

  // Load data on component mount
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Define table columns
  const columns = [
    { 
      title: 'Số vào sổ', 
      dataIndex: 'so_vao_so',
      width: 100
    },
    { 
      title: 'Số hiệu văn bằng', 
      dataIndex: 'so_hieu_van_bang',
      width: 150 
    },
    { 
      title: 'Mã sinh viên', 
      dataIndex: 'ma_sinh_vien',
      width: 120 
    },
    { 
      title: 'Họ tên', 
      dataIndex: 'ho_ten',
      width: 180 
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'ngay_sinh',
      width: 120,
      render: (text: string) => text ? moment(text).format('YYYY-MM-DD') : '',
    },
    { 
      title: 'Điểm TB', 
      dataIndex: 'diem_trung_binh',
      width: 100,
      render: (value: number) => value?.toFixed(2) || '',
    },
    { 
      title: 'Xếp loại', 
      dataIndex: 'xep_loai',
      width: 100 
    },
    { 
      title: 'Dân tộc', 
      dataIndex: 'dan_toc',
      width: 100 
    },
    { 
      title: 'Quyết định (ID)', 
      dataIndex: 'quyet_dinh_id',
      width: 130 
    },
    {
      title: 'Actions',
      fixed: 'right' as const,
      width: 150,
      render: (_: any, record: any) => (
        <>
          <Button type="link" onClick={() => initEditForm(record.id)}>
            Sửa
          </Button>
          <Button 
            type="link" 
            danger 
            onClick={async () => {
              try {
                await deleteVanBangData(record.id);
                fetchAllData();
                message.success('Đã xóa thành công');
              } catch (error) {
                message.error('Có lỗi xảy ra khi xóa');
              }
            }}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Button type="primary" onClick={() => initAddForm(1)}>
          Thêm Văn bằng
        </Button>
        <Button onClick={fetchAllData}>
          Làm mới dữ liệu
        </Button>
      </div>
      
      <Spin spinning={loading}>
        <Table 
          rowKey="id" 
          dataSource={vanBangs} 
          columns={columns} 
          scroll={{ x: 1300 }}
          pagination={{ pageSize: 10 }}
        />
      </Spin>
      
      {isModalVisible && <VanBangForm />}
    </div>
  );
};

export default VanBangPage;