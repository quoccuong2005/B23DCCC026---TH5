import React, { useEffect } from 'react';
import { Button, Table, Input, Select, Space, Modal, message } from 'antd';
import { useModel } from 'umi';
import { ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { danhSachNguoiPhuTrach, loaiPhong } from '@/services/QuanLyPhongHoc';
import type { ColumnsType } from 'antd/lib/table';
import PhongHocForm from './form';

const { Option } = Select;
const { confirm } = Modal;

const QuanLyPhongHoc: React.FC = () => {
  const {
    data,
    loadData,
    visible,
    setVisible,
    isEdit,
    setIsEdit,
    selectedPhongHoc,
    setSelectedPhongHoc,
    deletePhongHoc,
    searchText,
    setSearchText,
    filterLoaiPhong,
    setFilterLoaiPhong,
    filterNguoiPhuTrach,
    setFilterNguoiPhuTrach,
    sortOrder,
    setSortOrder
  } = useModel('quanlyphonghoc');

  useEffect(() => {
    loadData();
  }, []);

  // Handle delete confirmation
  const showDeleteConfirm = (record: QuanLyPhongHoc.PhongHoc) => {
    if (record.soChoNgoi >= 30) {
      message.error('Không thể xóa phòng có từ 30 chỗ ngồi trở lên');
      return;
    }

    confirm({
      title: `Bạn có chắc muốn xóa phòng ${record.tenPhong}?`,
      icon: <ExclamationCircleOutlined />,
      content: 'Hành động này không thể hoàn tác',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        deletePhongHoc(record.maPhong);
        message.success('Xóa phòng học thành công');
      }
    });
  };

  // Filter data based on search and filters
  const filteredData = data
    .filter(item => 
      (searchText ? item.maPhong.toLowerCase().includes(searchText.toLowerCase()) || 
                   item.tenPhong.toLowerCase().includes(searchText.toLowerCase()) : true) &&
      (filterLoaiPhong ? item.loaiPhong === filterLoaiPhong : true) &&
      (filterNguoiPhuTrach ? item.nguoiPhuTrach.id === filterNguoiPhuTrach : true)
    );

  // Table columns definition
  const columns: ColumnsType<QuanLyPhongHoc.PhongHoc> = [
    {
      title: 'Mã phòng',
      dataIndex: 'maPhong',
      key: 'maPhong',
      width: 120
    },
    {
      title: 'Tên phòng',
      dataIndex: 'tenPhong',
      key: 'tenPhong',
      width: 200
    },
    {
      title: 'Số chỗ ngồi',
      dataIndex: 'soChoNgoi',
      key: 'soChoNgoi',
      width: 120,
      sorter: (a, b) => a.soChoNgoi - b.soChoNgoi,
      sortOrder: sortOrder,
      onHeaderCell: () => ({
        onClick: () => {
          setSortOrder(sortOrder === 'ascend' ? 'descend' : 'ascend');
        }
      })
    },
    {
      title: 'Loại phòng',
      dataIndex: 'loaiPhong',
      key: 'loaiPhong',
      width: 120
    },
    {
      title: 'Người phụ trách',
      key: 'nguoiPhuTrach',
      width: 150,
      render: (_, record) => record.nguoiPhuTrach.name
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setSelectedPhongHoc(record);
              setIsEdit(true);
              setVisible(true);
            }}
          >
            Sửa
          </Button>
          <Button
            danger
            onClick={() => showDeleteConfirm(record)}
          >
            Xóa
          </Button>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Quản lý phòng học</h1>
      
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Space>
          <Input
            placeholder="Tìm kiếm theo mã hoặc tên phòng"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
          />
          
          <Select 
            placeholder="Loại phòng"
            style={{ width: 150 }}
            value={filterLoaiPhong}
            onChange={value => setFilterLoaiPhong(value)}
            allowClear
          >
            {loaiPhong.map(item => (
              <Option key={item} value={item}>{item}</Option>
            ))}
          </Select>

          <Select
            placeholder="Người phụ trách"
            style={{ width: 200 }}
            value={filterNguoiPhuTrach}
            onChange={value => setFilterNguoiPhuTrach(value)}
            allowClear
          >
            {danhSachNguoiPhuTrach.map(item => (
              <Option key={item.id} value={item.id}>{item.name}</Option>
            ))}
          </Select>
        </Space>

        <Button
          type="primary"
          onClick={() => {
            setSelectedPhongHoc(undefined);
            setIsEdit(false);
            setVisible(true);
          }}
        >
          Thêm phòng học
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="maPhong"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={isEdit ? "Chỉnh sửa phòng học" : "Thêm phòng học mới"}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        destroyOnClose
      >
        <PhongHocForm />
      </Modal>
    </div>
  );
};

export default QuanLyPhongHoc;