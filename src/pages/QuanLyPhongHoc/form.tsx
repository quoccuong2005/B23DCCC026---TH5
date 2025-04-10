import React from 'react';
import { Form, Input, InputNumber, Select, Button, Space, message } from 'antd';
import { useModel } from 'umi';
import { danhSachNguoiPhuTrach, loaiPhong } from '@/services/QuanLyPhongHoc';

const { Option } = Select;

const PhongHocForm: React.FC = () => {
  const {
    selectedPhongHoc,
    addPhongHoc,
    updatePhongHoc,
    isEdit,
    setVisible,
    checkDuplicate
  } = useModel('quanlyphonghoc');

  const [form] = Form.useForm();

  // Handle form submission
  const handleSubmit = (values: any) => {
    // Get selected người phụ trách object
    const nguoiPhuTrach = danhSachNguoiPhuTrach.find(
      item => item.id === values.nguoiPhuTrachId
    );

    if (!nguoiPhuTrach) {
      message.error('Vui lòng chọn người phụ trách hợp lệ');
      return;
    }

    // Check if mã phòng or tên phòng already exists
    const isDuplicate = checkDuplicate(
      values.maPhong, 
      values.tenPhong,
      isEdit ? selectedPhongHoc?.maPhong : undefined
    );

    if (isDuplicate) {
      message.error('Mã phòng hoặc tên phòng đã tồn tại');
      return;
    }

    // Create phòng học object
    const phongHoc: QuanLyPhongHoc.PhongHoc = {
      maPhong: values.maPhong,
      tenPhong: values.tenPhong,
      soChoNgoi: values.soChoNgoi,
      loaiPhong: values.loaiPhong,
      nguoiPhuTrach
    };

    // Add or update based on mode
    if (isEdit) {
      updatePhongHoc(phongHoc);
      message.success('Cập nhật phòng học thành công');
    } else {
      addPhongHoc(phongHoc);
      message.success('Thêm phòng học thành công');
    }

    setVisible(false);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={
        selectedPhongHoc
          ? {
              maPhong: selectedPhongHoc.maPhong,
              tenPhong: selectedPhongHoc.tenPhong,
              soChoNgoi: selectedPhongHoc.soChoNgoi,
              loaiPhong: selectedPhongHoc.loaiPhong,
              nguoiPhuTrachId: selectedPhongHoc.nguoiPhuTrach.id
            }
          : undefined
      }
    >
      <Form.Item
        name="maPhong"
        label="Mã phòng"
        rules={[
          { required: true, message: 'Vui lòng nhập mã phòng' },
          { max: 10, message: 'Mã phòng tối đa 10 ký tự' }
        ]}
      >
        <Input disabled={isEdit} />
      </Form.Item>

      <Form.Item
        name="tenPhong"
        label="Tên phòng"
        rules={[
          { required: true, message: 'Vui lòng nhập tên phòng' },
          { max: 50, message: 'Tên phòng tối đa 50 ký tự' }
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="soChoNgoi"
        label="Số chỗ ngồi"
        rules={[
          { required: true, message: 'Vui lòng nhập số chỗ ngồi' },
          { type: 'number', min: 10, message: 'Số chỗ ngồi tối thiểu là 10' },
          { type: 'number', max: 200, message: 'Số chỗ ngồi tối đa là 200' }
        ]}
      >
        <InputNumber min={10} max={200} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="loaiPhong"
        label="Loại phòng"
        rules={[{ required: true, message: 'Vui lòng chọn loại phòng' }]}
      >
        <Select placeholder="Chọn loại phòng">
          {loaiPhong.map(item => (
            <Option key={item} value={item}>
              {item}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="nguoiPhuTrachId"
        label="Người phụ trách"
        rules={[{ required: true, message: 'Vui lòng chọn người phụ trách' }]}
      >
        <Select placeholder="Chọn người phụ trách">
          {danhSachNguoiPhuTrach.map(item => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
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

export default PhongHocForm;