import { Modal, Form, Input, DatePicker, Switch, message } from 'antd';
import { useModel } from 'umi';
import moment from 'moment';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default ({ visible, onCancel, record, isEdit }: Club.Props) => {
  const { 
    form, 
    handleAdd, 
    handleEdit,
    previewUrl,
    setPreviewUrl 
  } = useModel('club');

  useEffect(() => {
    if (visible && record) {
      form.setFieldsValue({
        ...record,
        established: record.established ? moment(record.established) : null,
      });
      setPreviewUrl(record.avatar || '');
    } else {
      form.resetFields();
      setPreviewUrl('');
    }
  }, [visible, record, form]);

  const handleSubmit = async (values: any) => {
    try {
      const formData = {
        ...values,
        established: values.established?.format('YYYY-MM-DD'),
        avatar: values.avatar || 'https://via.placeholder.com/100',
        description: values.description || ''
      };

      if (isEdit && record) {
        await handleEdit(record.id, formData);
      } else {
        await handleAdd(formData);
      }
      message.success(isEdit ? 'Cập nhật thành công!' : 'Thêm mới thành công!');
      form.resetFields();
      setPreviewUrl('');
      onCancel();
    } catch (error) {
      console.error('Submit error:', error);
      message.error('Có lỗi xảy ra!');
    }
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link'],
      ['clean']
    ]
  };

  return (
    <Modal
      visible={visible}
      title={isEdit ? 'Edit Club' : 'Add New Club'}
      onCancel={() => {
        form.resetFields();
        setPreviewUrl('');
        onCancel();
      }}
      onOk={() => form.submit()}
      width={800}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        preserve={false}
      >
        <Form.Item
          name="avatar"
          label="Avatar URL"
          rules={[
            { required: true, message: 'Please input avatar URL!' },
            { type: 'url', message: 'Please enter a valid URL!' }
          ]}
        >
          <Input 
            placeholder="Enter image URL"
            onChange={(e) => setPreviewUrl(e.target.value)}
          />
        </Form.Item>

        {previewUrl && (
          <div style={{ marginBottom: 24 }}>
            <img 
              src={previewUrl} 
              alt="Preview" 
              style={{ 
                maxWidth: '200px',
                maxHeight: '200px',
                objectFit: 'cover',
                borderRadius: '4px'
              }} 
              onError={() => {
                message.error('Invalid image URL!');
                setPreviewUrl('');
                form.setFieldsValue({ avatar: '' });
              }}
            />
          </div>
        )}

        <Form.Item
          name="name"
          label="Club Name"
          rules={[{ required: true, message: 'Please input club name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="established"
          label="Established Date"
          rules={[{ required: true, message: 'Please select date!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: 'Please input description!' }]}
        >
          <ReactQuill 
            theme="snow"
            modules={modules}
            style={{ height: '200px', marginBottom: '50px' }}
          />
        </Form.Item>

        <Form.Item
          name="president"
          label="President"
          rules={[{ required: true, message: 'Please input president name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="active"
          label="Active"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
};