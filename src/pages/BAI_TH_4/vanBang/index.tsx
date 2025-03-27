import React from 'react';
import { Table, Button, message } from 'antd';
import { useModel } from 'umi';
import moment from 'moment';
import VanBangForm from './Form';
import '../../../services/Bai_TH4/vanBang/typings';

const VanBangPage: React.FC = () => {
  
  const {
    vanBangs,
    cauHinhs,
    loading,
    isModalVisible,
    isEditing,
    selectedVanBang,
    initAddForm,
    initEditForm,
    closeModal,
    addVanBang,
    updateVanBangData,
    deleteVanBangData,
    fetchAllData,
  } = useModel('bai_th_4.vanBang') as VanBangAPI.VanBangModelType;

  // Build dynamic columns from cấu hình
  const dynamicColumns = cauHinhs.map((field) => {
    const key = field.ten_truong.toLowerCase().replace(/\s+/g, '_');
    return {
      title: field.ten_truong,
      dataIndex: key,
      key,
      render: (text: any) => {
        if (field.kieu_du_lieu === 'Date' && text) {
          return moment(text).format('YYYY-MM-DD');
        }
        return text;
      },
    };
  });

  const columns = [
    { title: 'Số vào sổ', dataIndex: 'so_vao_so', key: 'so_vao_so' },
    { title: 'Số hiệu văn bằng', dataIndex: 'so_hieu_van_bang', key: 'so_hieu_van_bang' },
    { title: 'Mã sinh viên', dataIndex: 'ma_sinh_vien', key: 'ma_sinh_vien' },
    { title: 'Họ tên', dataIndex: 'ho_ten', key: 'ho_ten' },
    {
      title: 'Ngày sinh',
      dataIndex: 'ngay_sinh',
      key: 'ngay_sinh',
      render: (text: string) => (text ? moment(text).format('YYYY-MM-DD') : ''),
    },
    { title: 'Quyết định', dataIndex: 'quyet_dinh_id', key: 'quyet_dinh_id' },
    ...dynamicColumns,
    {
      title: 'Hành động',
      key: 'action',
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
                message.success('Xóa văn bằng thành công');
              } catch (error) {
                message.error('Lỗi khi xóa văn bằng');
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
      <Button type="primary" onClick={() => initAddForm(1)}>
        Thêm Văn bằng
      </Button>
      <Table
        rowKey="id"
        dataSource={vanBangs}
        columns={columns}
        loading={loading}
        style={{ marginTop: 20 }}
      />
      {/* We don't need to pass props to VanBangForm since it uses the model directly */}
      <VanBangForm />
    </div>
  );
};

export default VanBangPage;