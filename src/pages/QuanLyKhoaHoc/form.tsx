import React from 'react';
import { Form, Input, InputNumber, Select, Button, Space, message } from 'antd';
import { useModel } from 'umi';
import { danhSachGiangVien, trangThaiKhoaHoc } from '@/services/QuanLyKhoaHoc';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Option } = Select;

const KhoaHocForm: React.FC = () => {
  const {
    selectedKhoaHoc,
    addKhoaHoc,
    updateKhoaHoc,
    isEdit,
    setVisible,
    checkDuplicate,
    generateId
  } = useModel('quanlykhoahoc');

  const [form] = Form.useForm();

  // Handle form submission
  const handleSubmit = (values: any) => {
    // Get selected giảng viên object
    const giangVien = danhSachGiangVien.find(
      item => item.id === values.giangVienId
    );

    if (!giangVien) {
      message.error('Vui lòng chọn giảng viên hợp lệ');
      return;
    }

    // Check if course name already exists
    const isDuplicate = checkDuplicate(
      values.tenKhoaHoc,
      isEdit ? selectedKhoaHoc?.id : undefined
    );

    if (isDuplicate) {
      message.error('Tên khóa học đã tồn tại');
      return;
    }

    // Create course object
    const khoaHoc: QuanLyKhoaHoc.KhoaHoc = {
      id: isEdit ? selectedKhoaHoc!.id : generateId(),
      tenKhoaHoc: values.tenKhoaHoc,
      soLuongHocVien: values.soLuongHocVien,
      moTa: values.moTa || '',
      trangThai: values.trangThai,
      giangVien
    };

    // Add or update based on mode
    if (isEdit) {
      updateKhoaHoc(khoaHoc);
      message.success('Cập nhật khóa học thành công');
    } else {
      addKhoaHoc(khoaHoc);
      message.success('Thêm khóa học thành công');
    }

    setVisible(false);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={
        selectedKhoaHoc
          ? {
              tenKhoaHoc: selectedKhoaHoc.tenKhoaHoc,
              soLuongHocVien: selectedKhoaHoc.soLuongHocVien,
              moTa: selectedKhoaHoc.moTa,
              trangThai: selectedKhoaHoc.trangThai,
              giangVienId: selectedKhoaHoc.giangVien.id
            }
          : { soLuongHocVien: 0 }
      }
    >
      <Form.Item
        name="tenKhoaHoc"
        label="Tên khóa học"
        rules={[
          { required: true, message: 'Vui lòng nhập tên khóa học' },
          { max: 100, message: 'Tên khóa học tối đa 100 ký tự' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="giangVienId"
        label="Giảng viên"
        rules={[{ required: true, message: 'Vui lòng chọn giảng viên' }]}
      >
        <Select placeholder="Chọn giảng viên">
          {danhSachGiangVien.map(item => (
            <Option key={item.id} value={item.id}>
              {item.ten} - {item.chuyenNganh}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="soLuongHocVien"
        label="Số lượng học viên"
        rules={[
          { required: true, message: 'Vui lòng nhập số lượng học viên' },
          { type: 'number', min: 0, message: 'Số lượng học viên không âm' }
        ]}
      >
        <InputNumber min={0} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="trangThai"
        label="Trạng thái"
        rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
      >
        <Select placeholder="Chọn trạng thái">
          {trangThaiKhoaHoc.map(item => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="moTa"
        label="Mô tả khóa học"
        rules={[{ required: true, message: 'Vui lòng nhập mô tả khóa học' }]}
      >
        <ReactQuill theme="snow" style={{ height: 200, marginBottom: 50 }} />
      </Form.Item>

      <Form.Item style={{ marginTop: 60 }}>
        <Space>
          <Button type="primary" htmlType="submit">
            {isEdit ? 'Cập nhật' : 'Thêm mới'}
          </Button>
          <Button onClick={() => setVisible(false)}>Hủy</Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default KhoaHocForm;