import React, { useEffect } from 'react';
import { Form, Input, Select, Button, Modal, Timeline, Collapse } from 'antd';
import { useModel } from 'umi';
import moment from 'moment';

const { Option } = Select;
const { Panel } = Collapse;

interface ApplicationFormProps {
  clubs: ClubManagement.Club[];
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ clubs }) => {
  const { 
    currentApplication,
    applicationModalVisible, 
    setApplicationModalVisible,
    applicationModalMode,
    addApplication,
    editApplication
  } = useModel('Bai_3');

  const [form] = Form.useForm();

  useEffect(() => {
    if (!applicationModalVisible) {
      form.resetFields();
    }
  }, [applicationModalVisible]);

  useEffect(() => {
    if (applicationModalVisible && applicationModalMode !== 'create' && currentApplication) {
      form.setFieldsValue(currentApplication);
    }
  }, [applicationModalVisible, applicationModalMode, currentApplication]);

  const handleSubmit = (values: any) => {
    if (applicationModalMode === 'create') {
      addApplication({
        ...values,
        status: 'Pending',
        history: []
      });
    } else if (applicationModalMode === 'edit') {
      editApplication(currentApplication!.id, values);
    }
  };

  const isViewMode = applicationModalMode === 'view';

  return (
    <Modal
      title={
        applicationModalMode === 'create' 
          ? 'Thêm đơn đăng ký mới' 
          : applicationModalMode === 'edit' 
            ? 'Chỉnh sửa đơn đăng ký' 
            : 'Chi tiết đơn đăng ký'
      }
      visible={applicationModalVisible}
      onCancel={() => setApplicationModalVisible(false)}
      footer={null}
      destroyOnClose
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={isViewMode}
      >
        <Form.Item
          label="Họ và tên"
          name="fullName"
          rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
        >
          <Input placeholder="Họ và tên" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email' },
            { type: 'email', message: 'Email không hợp lệ' }
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
        >
          <Input placeholder="Số điện thoại" />
        </Form.Item>

        <Form.Item
          label="Giới tính"
          name="gender"
          rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}
        >
          <Select placeholder="Chọn giới tính">
            <Option value="Nam">Nam</Option>
            <Option value="Nữ">Nữ</Option>
            <Option value="Khác">Khác</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
        >
          <Input placeholder="Địa chỉ" />
        </Form.Item>

        <Form.Item
          label="Sở trường"
          name="strengths"
          rules={[{ required: true, message: 'Vui lòng nhập sở trường' }]}
        >
          <Input placeholder="Sở trường" />
        </Form.Item>

        <Form.Item
          label="Câu lạc bộ"
          name="clubId"
          rules={[{ required: true, message: 'Vui lòng chọn câu lạc bộ' }]}
        >
          <Select placeholder="Chọn câu lạc bộ">
            {clubs
              .filter(club => club.active)
              .map(club => (
                <Option key={club.id} value={club.id}>{club.name}</Option>
              ))
            }
          </Select>
        </Form.Item>

        <Form.Item
          label="Lý do đăng ký"
          name="reason"
          rules={[{ required: true, message: 'Vui lòng nhập lý do đăng ký' }]}
        >
          <Input.TextArea rows={3} placeholder="Lý do đăng ký" />
        </Form.Item>

        {isViewMode && currentApplication?.status === 'Rejected' && (
          <Form.Item label="Lý do từ chối">
            <Input.TextArea value={currentApplication.note} disabled rows={2} />
          </Form.Item>
        )}

        {isViewMode && currentApplication?.history?.length > 0 && (
          <Collapse style={{ marginBottom: 16 }}>
            <Panel header="Lịch sử xử lý đơn" key="1">
              <Timeline>
                {currentApplication?.history.map((item, index) => (
                  <Timeline.Item key={index} color={item.action === 'Approved' ? 'green' : 'red'}>
                    <p><strong>{item.action}</strong> bởi {item.by} vào lúc {moment(item.timestamp).format('HH:mm DD/MM/YYYY')}</p>
                    {item.reason && <p><strong>Lý do:</strong> {item.reason}</p>}
                  </Timeline.Item>
                ))}
              </Timeline>
            </Panel>
          </Collapse>
        )}

        {!isViewMode && (
          <Form.Item style={{ marginTop: 24 }}>
            <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
              {applicationModalMode === 'create' ? 'Thêm mới' : 'Cập nhật'}
            </Button>
            <Button onClick={() => setApplicationModalVisible(false)}>Hủy</Button>
          </Form.Item>
        )}

        {isViewMode && (
          <Button onClick={() => setApplicationModalVisible(false)}>Đóng</Button>
        )}
      </Form>
    </Modal>
  );
};

export default ApplicationForm;