import React, { useEffect } from 'react';
import { Button, Table, Input, Select, Space, Modal, message, Tag } from 'antd';
import { useModel } from 'umi';
import { ExclamationCircleOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { danhSachGiangVien, trangThaiKhoaHoc } from '@/services/QuanLyKhoaHoc';
import type { ColumnsType } from 'antd/lib/table';
import KhoaHocForm from './form';

const { Option } = Select;
const { confirm } = Modal;

const QuanLyKhoaHoc: React.FC = () => {
  const {
    data,
    loadData,
    visible,
    setVisible,
    isEdit,
    setIsEdit,
    selectedKhoaHoc,
    setSelectedKhoaHoc,
    deleteKhoaHoc,
    searchText,
    setSearchText,
    filterGiangVien,
    setFilterGiangVien,
    filterTrangThai,
    setFilterTrangThai,
    sortOrder,
    setSortOrder
  } = useModel('quanlykhoahoc');

  useEffect(() => {
    loadData();
  }, []);

  // Handle delete confirmation
  const showDeleteConfirm = (record: QuanLyKhoaHoc.KhoaHoc) => {
    if (record.soLuongHocVien > 0) {
      message.error('Không thể xóa khóa học đã có học viên');
      return;
    }

    confirm({
      title: `Bạn có chắc muốn xóa khóa học "${record.tenKhoaHoc}"?`,
      icon: <ExclamationCircleOutlined />,
      content: 'Hành động này không thể hoàn tác',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        deleteKhoaHoc(record.id);
        message.success('Xóa khóa học thành công');
      }
    });
  };

  // Filter data based on search and filters
  const filteredData = data
    .filter(item => 
      (searchText ? item.tenKhoaHoc.toLowerCase().includes(searchText.toLowerCase()) : true) &&
      (filterGiangVien ? item.giangVien.id === filterGiangVien : true) &&
      (filterTrangThai ? item.trangThai === filterTrangThai : true)
    );

  // Render status tag with color
  const renderStatusTag = (status: QuanLyKhoaHoc.TrangThai) => {
    let color = '';
    switch (status) {
      case 'Đang mở':
        color = 'green';
        break;
      case 'Đã kết thúc':
        color = 'gray';
        break;
      case 'Tạm dừng':
        color = 'orange';
        break;
    }
    return <Tag color={color}>{status}</Tag>;
  };

  // Table columns definition
  const columns: ColumnsType<QuanLyKhoaHoc.KhoaHoc> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100
    },
    {
      title: 'Tên khóa học',
      dataIndex: 'tenKhoaHoc',
      key: 'tenKhoaHoc',
      width: 250
    },
    {
      title: 'Giảng viên',
      key: 'giangVien',
      width: 150,
      render: (_, record) => record.giangVien.ten
    },
    {
      title: 'Số lượng học viên',
      dataIndex: 'soLuongHocVien',
      key: 'soLuongHocVien',
      width: 120,
      sorter: (a, b) => a.soLuongHocVien - b.soLuongHocVien,
      sortOrder: sortOrder,
      onHeaderCell: () => ({
        onClick: () => {
          setSortOrder(sortOrder === 'ascend' ? 'descend' : 'ascend');
        }
      })
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      width: 120,
      render: renderStatusTag
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
              setSelectedKhoaHoc(record);
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
      <h1>Quản lý khóa học online</h1>
      
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <Space>
          <Input
            placeholder="Tìm kiếm theo tên khóa học"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
          />
          
          <Select 
            placeholder="Giảng viên"
            style={{ width: 200 }}
            value={filterGiangVien}
            onChange={value => setFilterGiangVien(value)}
            allowClear
          >
            {danhSachGiangVien.map(item => (
              <Option key={item.id} value={item.id}>{item.ten}</Option>
            ))}
          </Select>

          <Select
            placeholder="Trạng thái"
            style={{ width: 150 }}
            value={filterTrangThai}
            onChange={value => setFilterTrangThai(value)}
            allowClear
          >
            {trangThaiKhoaHoc.map(item => (
              <Option key={item} value={item}>{item}</Option>
            ))}
          </Select>
        </Space>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setSelectedKhoaHoc(undefined);
            setIsEdit(false);
            setVisible(true);
          }}
        >
          Thêm khóa học
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={isEdit ? "Chỉnh sửa khóa học" : "Thêm khóa học mới"}
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        destroyOnClose
        width={700}
      >
        <KhoaHocForm />
      </Modal>
    </div>
  );
};

export default QuanLyKhoaHoc;