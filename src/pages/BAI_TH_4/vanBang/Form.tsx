import React, { useEffect } from 'react';
import { Modal, Form, Input, DatePicker, InputNumber, Select } from 'antd';
import moment from 'moment';
import { useModel } from 'umi';
import { VanBangAPI } from '../../../services/Bai_TH4/vanBang/typings';

/**
 * Form for adding/editing văn bằng records
 */
const VanBangForm: React.FC = () => {
  const [form] = Form.useForm();
  
  // Get data and methods from the model
  const model = useModel('bai_th_4.vanBang') as VanBangAPI.VanBangModelType;
  const { 
    selectedVanBang, 
    isModalVisible, 
    isEditing, 
    closeModal, 
    addVanBang, 
    updateVanBangData, 
    cauHinhs 
  } = model;

  // Update form when selectedVanBang changes
  useEffect(() => {
    if (selectedVanBang) {
      const values = { ...selectedVanBang };
      
      // Convert string date to Moment object for DatePicker
      if (values.ngay_sinh) {
        values.ngay_sinh = moment(values.ngay_sinh);
      }
      
      // Convert dynamic date fields to Moment objects if needed
      (cauHinhs || []).forEach(field => {
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

  /**
   * Render form field based on field configuration
   */
  const renderDynamicField = (field: VanBangAPI.CauHinh) => {
    const key = field.ten_truong.toLowerCase().replace(/\s+/g, '_');
    
    switch (field.kieu_du_lieu) {
      case 'String':
        return (
          <Form.Item key={key} label={field.ten_truong} name={key}>
            <Input />
          </Form.Item>
        );
      case 'Number':
        return (
          <Form.Item key={key} label={field.ten_truong} name={key}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
        );
      case 'Date':
        return (
          <Form.Item key={key} label={field.ten_truong} name={key}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        );
      default:
        return null;
    }
  };

  /**
   * Handle form submission
   */
  const handleOk = async () => {
    try {
      // Validate form fields
      const values = await form.validateFields();
      
      // Convert Moment objects to strings for dates
      if (values.ngay_sinh) {
        values.ngay_sinh = values.ngay_sinh.format('YYYY-MM-DD');
      }
      
      // Convert any dynamic date fields
      (cauHinhs || []).forEach(field => {
        const key = field.ten_truong.toLowerCase().replace(/\s+/g, '_');
        if (values[key] && field.kieu_du_lieu === 'Date') {
          values[key] = values[key].format('YYYY-MM-DD');
        }
      });
      
      // Add or update record
      if (isEditing && selectedVanBang) {
        await updateVanBangData(selectedVanBang.id as number, values);
      } else {
        await addVanBang(values as VanBangAPI.VanBang);
      }
      
      closeModal();
      form.resetFields();
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
      destroyOnClose
      width={700}
    >
      <Form form={form} layout="vertical">
        {/* Basic fields matching db.json structure */}
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
          <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
        </Form.Item>
        
        <Form.Item
          label="Điểm trung bình"
          name="diem_trung_binh"
          rules={[{ required: true, message: 'Vui lòng nhập điểm trung bình' }]}
        >
          <InputNumber min={0} max={10} step={0.1} style={{ width: '100%' }} />
        </Form.Item>
        
        <Form.Item
          label="Xếp loại"
          name="xep_loai"
          rules={[{ required: true, message: 'Vui lòng chọn xếp loại' }]}
        >
          <Select>
            <Select.Option value="Xuất sắc">Xuất sắc</Select.Option>
            <Select.Option value="Giỏi">Giỏi</Select.Option>
            <Select.Option value="Khá">Khá</Select.Option>
            <Select.Option value="Trung bình">Trung bình</Select.Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          label="Hệ đào tạo"
          name="he_dao_tao"
          rules={[{ required: true, message: 'Vui lòng nhập hệ đào tạo' }]}
        >
          <Select>
            <Select.Option value="Chính quy">Chính quy</Select.Option>
            <Select.Option value="Tại chức">Tại chức</Select.Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          label="Nơi sinh"
          name="noi_sinh"
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          label="Dân tộc"
          name="dan_toc"
        >
          <Input />
        </Form.Item>
        
        <Form.Item
          label="Quyết định (ID)"
          name="quyet_dinh_id"
          rules={[{ required: true, message: 'Vui lòng nhập mã quyết định' }]}
        >
          <InputNumber style={{ width: '100%' }} min={1} />
        </Form.Item>
        
        {/* Render any dynamic fields from cauHinhs */}
        {(cauHinhs || []).map(field => renderDynamicField(field))}
      </Form>
    </Modal>
  );
};

export default VanBangForm;