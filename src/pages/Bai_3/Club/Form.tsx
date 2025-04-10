import React from 'react';
import { Form, Input, DatePicker, Switch, Button, Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import moment from 'moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const ClubForm: React.FC = () => {
  const { 
    currentClub, 
    clubModalVisible, 
    setClubModalVisible, 
    clubModalMode, 
    addClub, 
    editClub 
  } = useModel('Bai_3');

  const [form] = Form.useForm();

  // Reset form khi modal đóng
  React.useEffect(() => {
    if (!clubModalVisible) {
      form.resetFields();
    }
  }, [clubModalVisible]);

  // Set giá trị cho form khi chỉnh sửa
  React.useEffect(() => {
    if (clubModalVisible && clubModalMode === 'edit' && currentClub) {
      form.setFieldsValue({
        ...currentClub,
        established: currentClub.established ? moment(currentClub.established) : null
      });
    }
  }, [clubModalVisible, clubModalMode, currentClub]);

  const handleSubmit = (values: any) => {
    const formattedValues = {
      ...values,
      established: values.established ? values.established.format('YYYY-MM-DD') : null
    };

    if (clubModalMode === 'create') {
      addClub(formattedValues);
    } else {
      editClub(currentClub!.id, formattedValues);
    }
  };

  return (
    <Modal
      title={clubModalMode === 'create' ? 'Thêm câu lạc bộ mới' : 'Chỉnh sửa câu lạc bộ'}
      visible={clubModalVisible}
      onCancel={() => setClubModalVisible(false)}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          active: true,
          avatar: 'https://via.placeholder.com/100'
        }}
      >
        <Form.Item
          label="Ảnh đại diện"
          name="avatar"
          rules={[{ required: true, message: 'Vui lòng nhập URL ảnh đại diện' }]}
        >
          <Input placeholder="URL ảnh đại diện" />
        </Form.Item>

        <Form.Item
          label="Tên câu lạc bộ"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên câu lạc bộ' }]}
        >
          <Input placeholder="Tên câu lạc bộ" />
        </Form.Item>

        <Form.Item
          label="Ngày thành lập"
          name="established"
          rules={[{ required: true, message: 'Vui lòng chọn ngày thành lập' }]}
        >
          <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
        </Form.Item>

        <Form.Item
          label="Mô tả"
          name="description"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
        >
          <ReactQuill theme="snow" />
        </Form.Item>

        <Form.Item
          label="Chủ nhiệm CLB"
          name="president"
          rules={[{ required: true, message: 'Vui lòng nhập tên chủ nhiệm' }]}
        >
          <Input placeholder="Tên chủ nhiệm CLB" />
        </Form.Item>

        <Form.Item
          label="Hoạt động"
          name="active"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>

        <Form.Item style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            {clubModalMode === 'create' ? 'Thêm mới' : 'Cập nhật'}
          </Button>
          <Button onClick={() => setClubModalVisible(false)}>Hủy</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ClubForm;