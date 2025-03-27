import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, InputNumber } from 'antd';
import moment from 'moment';
import { useModel } from 'umi';

interface VanBangModelType {
  vanBangs: VanBangAPI.VanBang[];
  soVanBangs: VanBangAPI.SoVanBang[];
  quyetDinhs: VanBangAPI.QuyetDinh[];
  cauHinhs: VanBangAPI.CauHinh[];
  selectedVanBang: VanBangAPI.VanBang | null;
  isModalVisible: boolean;
  isEditing: boolean;
  loading: boolean;
  fetchAllData: () => Promise<void>;
  getNextSoVaoSo: (soVanBangId: number) => number;
  addVanBang: (data: VanBangAPI.VanBang) => Promise<any>;
  updateVanBangData: (id: number, data: VanBangAPI.VanBang) => Promise<any>;
  deleteVanBangData: (id: number) => Promise<void>;
  initAddForm: (quyetDinhId: number) => void;
  initEditForm: (id: number) => void;
  closeModal: () => void;
}

const VanBangForm: React.FC = () => {
  const [form] = Form.useForm();
  
  // Use the correct model name and type - using dot notation instead of slash
  const model = useModel('bai_th_4.vanBang') as VanBangModelType;
  
  const {
    selectedVanBang,
    isModalVisible,
    isEditing,
    closeModal,
    addVanBang,
    updateVanBangData,
    cauHinhs,
  } = model;

  useEffect(() => {
    if (selectedVanBang) {
      const values = { ...selectedVanBang };
      if (values.ngay_sinh) {
        values.ngay_sinh = moment(values.ngay_sinh).format('YYYY-MM-DD');
      }
      // Convert dynamic date fields
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
  }, [selectedVanBang, form, cauHinhs]);

  const renderDynamicField = (field: VanBangAPI.CauHinh) => {
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

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (values.ngay_sinh) {
        values.ngay_sinh = values.ngay_sinh.format('YYYY-MM-DD');
      }
      cauHinhs.forEach(field => {
        const key = field.ten_truong.toLowerCase().replace(/\s+/g, '_');
        if (values[key] && field.kieu_du_lieu === 'Date') {
          values[key] = values[key].format('YYYY-MM-DD');
        }
      });
      if (isEditing && selectedVanBang) {
        await updateVanBangData(selectedVanBang.id as number, values);
      } else {
        await addVanBang(values as VanBangAPI.VanBang);
      }
      closeModal();
    } catch (info) {
      console.error('Validation Failed:', info);
    }
  };

  return (
    <Modal
      visible={isModalVisible}
      title={isEditing ? 'Chỉnh sửa Văn bằng' : 'Thêm Văn bằng'}
      onCancel={closeModal}
      onOk={handleOk}
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