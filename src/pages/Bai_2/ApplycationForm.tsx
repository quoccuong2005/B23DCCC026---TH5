import React, { useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import useApplicationModel from '../../models/Bai_2/Applycation';
import type { ApplicationFormProps } from '../../services/Bai_2/typing';


const ApplicationForm: React.FC<ApplicationFormProps> = ({ visible, onClose, onSubmit, initialValues }) => {
    const [form] = Form.useForm();
    const { clubs, fetchClubsFromAPI } = useApplicationModel();
    useEffect(() => {
        fetchClubsFromAPI();
    }, []);

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();
        }
    }, [initialValues]);

    const handleFinish = (values: any) => {
        onSubmit({ ...initialValues, ...values });
        form.resetFields();
    };

    return (
        <Modal
            visible={visible}
            title={initialValues ? 'Chỉnh sửa đơn đăng ký' : 'Thêm mới đơn đăng ký'}
            onCancel={onClose}
            onOk={() => form.submit()}
        >
            <Form form={form} onFinish={handleFinish}>
                <Form.Item name="fullName" label="Họ tên" rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Vui lòng nhập email!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="phone" label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="gender" label="Giới tính" rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}>
                    <Select>
                        <Select.Option value="Nam">Nam</Select.Option>
                        <Select.Option value="Nữ">Nữ</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item name="address" label="Địa chỉ" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="clubId" label="Câu lạc bộ" rules={[{ required: true, message: 'Vui lòng chọn câu lạc bộ!' }]}>
                    <Select placeholder="Chọn câu lạc bộ">
                        {clubs.map((club) => (
                            <Select.Option key={club.id} value={club.id}>
                                {club.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="reason" label="Lý do đăng ký" rules={[{ required: true, message: 'Vui lòng nhập lý do!' }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="strengths" label="Điểm mạnh" rules={[{ required: true, message: 'Vui lòng nhập điểm mạnh!' }]}>
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="note" label="Ghi chú">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item name="status" label="Trạng thái" rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}>
                    <Select>
                        <Select.Option value="Pending">Chờ duyệt</Select.Option>
                        <Select.Option value="Approved">Đã duyệt</Select.Option>
                        <Select.Option value="Rejected">Đã từ chối</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ApplicationForm;