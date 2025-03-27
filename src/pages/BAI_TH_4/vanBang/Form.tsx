import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, InputNumber } from 'antd';
import moment from 'moment';

export interface VanBangFormProps {
  visible: boolean;
  isEditing: boolean;
  initialValues?: any;
  cauHinhs: any[];
  onCancel: () => void;
  onFinish: (values: any) => void;
}

const VanBangForm: React.FC<VanBangFormProps> = ({
  visible,
  isEditing,
  initialValues,
  cauHinhs,
  onCancel,
  onFinish,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      const values = { ...initialValues };
      if (values.ngay_sinh) {
        values.ngay_sinh = moment(values.ngay_sinh);
      }
      // For each dynamic field, parse Date values if needed
      cauHinhs.forEach(field => {
        const key = field.ten_truong.toLowerCase().replace(/\s+/g, '_');
        if (values[key] && field.kieu_du_lieu === 'Date') {
          values[key] = moment(values[key]);
        }
      });
      form.setFieldsValue(values);
    } else {
      form.resetFields();
    }
  }, [initialValues, form, cauHinhs]);

  const renderDynamicField = (field: any) => {
    const key = field.ten_truong.toLowerCase().replace(/\s+/g, '_');
    if (field.kieu_du_lieu === 'String') {
      return (
        <Form.Item key={key} label={field.ten_truong} name={key}>
          <Input />
        </Form.Item>
      );
    } else if (field.kieu_du_lieu === 'Number') {
      return (
        <Form.Item key={key} label={field.ten_truong} name={key}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>
      );
    } else if (field.kieu_du_lieu === 'Date') {
      return (
        <Form.Item key={key} label={field.ten_truong} name={key}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
      );
    }
    return null;
  };

  return (
    <Modal
      visible={visible}
      title={isEditing ? 'Chỉnh sửa Văn bằng' : 'Thêm Văn bằng'}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            if (values.ngay_sinh) {
              values.ngay_sinh = values.ngay_sinh.format('YYYY-MM-DD');
            }
            cauHinhs.forEach(field => {
              const key = field.ten_truong.toLowerCase().replace(/\s+/g, '_');
              if (values[key] && field.kieu_du_lieu === 'Date') {
                values[key] = values[key].format('YYYY-MM-DD');
              }
            });
            onFinish(values);
          })
          .catch(info => {
            console.error('Validation Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical">
        {/* 5 default fields */}
        <Form.Item label="Số vào sổ" name="so_vao_so">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Số hiệu văn bằng"
          name="so_hieu_van_bang"
          rules={[{ required: true, message: 'Vui lòng nhập số hiệu văn bằng' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mã sinh viên"
          name="ma_sinh_vien"
          rules={[{ required: true, message: 'Vui lòng nhập mã sinh viên' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Họ tên"
          name="ho_ten"
          rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ngày sinh"
          name="ngay_sinh"
          rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        {/* Field for quyết định */}
        <Form.Item
          label="Quyết định (ID)"
          name="quyet_dinh_id"
          rules={[{ required: true, message: 'Vui lòng nhập mã quyết định' }]}
        >
          <Input />
        </Form.Item>
        {/* Dynamic fields from cấu hình */}
        {cauHinhs.map(field => renderDynamicField(field))}
      </Form>
    </Modal>
  );
};

export default VanBangForm;