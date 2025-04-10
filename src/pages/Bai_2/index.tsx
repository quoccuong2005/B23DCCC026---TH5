import React, { useEffect } from 'react';
import { Table, Button, Modal, message, Input, Descriptions } from 'antd';
import useApplicationModel from '../../models/Bai_2/Applycation';
import ApplicationForm from './ApplycationForm';

const ApplicationsPage: React.FC = () => {
    const {
        applications,
        isModalVisible,
        setIsModalVisible,
        isRejectModalVisible,
        setIsRejectModalVisible,
        editingApplication,
        setEditingApplication,
        rejectReason,
        setRejectReason,
        selectedRowKeys,
        setSelectedRowKeys,
        isDetailModalVisible,
        setIsDetailModalVisible,
        viewingApplication,
        setViewingApplication,
        isHistoryModalVisible,
        setIsHistoryModalVisible,
        loading,
        fetchApplicationsFromAPI,
        addApplicationToAPI,
        updateApplicationInAPI,
        deleteApplicationFromAPI,
    } = useApplicationModel();


    useEffect(() => {
        fetchApplicationsFromAPI();
    }, []);

    const handleDelete = async (id: number) => {
        await deleteApplicationFromAPI(id);
        message.success('Xóa đơn đăng ký thành công!');
    };


    const handleApproveSelected = async () => {
        if (selectedRowKeys.length === 0) {
            message.warning('Vui lòng chọn ít nhất một đơn đăng ký!');
            return;
        }
        for (const id of selectedRowKeys) {
            const application = applications.find((app) => app.id === id);
            if (application) {
                await updateApplicationInAPI({
                    ...application,
                    status: 'Approved',
                    history: [
                        ...(application.history || []),
                        {
                            action: 'Approved',
                            by: 'Admin',
                            timestamp: new Date().toISOString(),
                            reason: '',
                        },
                    ],
                });
            }
        }
        message.success(`Đã duyệt ${selectedRowKeys.length} đơn đăng ký!`);
        setSelectedRowKeys([]);
    };

    const handleRejectSelected = async () => {
        if (selectedRowKeys.length === 0) {
            message.warning('Vui lòng chọn ít nhất một đơn đăng ký!');
            return;
        }
        if (!rejectReason.trim()) {
            message.error('Vui lòng nhập lý do từ chối!');
            return;
        }
        for (const id of selectedRowKeys) {
            const application = applications.find((app) => app.id === id);
            if (application) {
                await updateApplicationInAPI({
                    ...application,
                    status: 'Rejected',
                    note: rejectReason,
                    history: [
                        ...(application.history || []),
                        {
                            action: 'Rejected',
                            by: 'Admin',
                            timestamp: new Date().toISOString(),
                            reason: rejectReason,
                        },
                    ],
                });
            }
        }
        message.success(`Đã từ chối ${selectedRowKeys.length} đơn đăng ký!`);
        setRejectReason('');
        setIsRejectModalVisible(false);
        setSelectedRowKeys([]);
    };


    const columns = [
        { title: 'Họ tên', dataIndex: 'fullName', key: 'fullName' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
        { title: 'Giới tính', dataIndex: 'gender', key: 'gender' },
        { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
        { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
        {
            title: 'Hành động',
            render: (record: any) => (
                <>
                    <Button onClick={() => { setEditingApplication(record); setIsModalVisible(true); }}>Sửa</Button>
                    <Button danger onClick={() => handleDelete(record.id)}>Xóa</Button>
                    <Button onClick={() => { setViewingApplication(record); setIsDetailModalVisible(true); }}>
                        Xem chi tiết
                    </Button>
                    <Button onClick={() => { setViewingApplication(record); setIsHistoryModalVisible(true); }}>
                        Xem lịch sử thao tác
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div>

            <div style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={() => { setEditingApplication(null); setIsModalVisible(true); }}>
                    Thêm đơn đăng ký
                </Button>
                <Button type="primary" onClick={handleApproveSelected} style={{ marginLeft: 8 }}>
                    Duyệt {selectedRowKeys.length} đơn đã chọn
                </Button>
                <Button danger onClick={() => setIsRejectModalVisible(true)} style={{ marginLeft: 8 }}>
                    Từ chối {selectedRowKeys.length} đơn đã chọn
                </Button>
            </div>
            <Table
                rowSelection={{
                    selectedRowKeys,
                    onChange: (keys) => setSelectedRowKeys(keys as number[]),
                }}
                columns={columns}
                dataSource={applications}
                rowKey="id"
                loading={loading}
            />
            <ApplicationForm
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSubmit={(application) => {
                    if (editingApplication) {
                        updateApplicationInAPI(application);
                        message.success('Cập nhật đơn đăng ký thành công!');
                    } else {
                        addApplicationToAPI(application);
                        message.success('Thêm đơn đăng ký thành công!');
                    }
                    setIsModalVisible(false);
                }}
                initialValues={editingApplication}
            />
            <Modal
                visible={isRejectModalVisible}
                title="Từ chối đơn đăng ký"
                onCancel={() => setIsRejectModalVisible(false)}
                onOk={handleRejectSelected}
            >
                <p>Vui lòng nhập lý do từ chối:</p>
                <Input.TextArea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    rows={4}
                />
            </Modal>
            <Modal
                visible={isDetailModalVisible}
                title="Chi tiết đơn đăng ký"
                onCancel={() => setIsDetailModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
                        Đóng
                    </Button>,
                ]}
            >
                {viewingApplication && (
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="Họ tên">{viewingApplication.fullName}</Descriptions.Item>
                        <Descriptions.Item label="Email">{viewingApplication.email}</Descriptions.Item>
                        <Descriptions.Item label="Số điện thoại">{viewingApplication.phone}</Descriptions.Item>
                        <Descriptions.Item label="Giới tính">{viewingApplication.gender}</Descriptions.Item>
                        <Descriptions.Item label="Địa chỉ">{viewingApplication.address}</Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">{viewingApplication.status}</Descriptions.Item>
                        <Descriptions.Item label="Lý do đăng ký">{viewingApplication.reason}</Descriptions.Item>
                        <Descriptions.Item label="Ghi chú">{viewingApplication.note}</Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
            <Modal
                visible={isHistoryModalVisible}
                title="Lịch sử thao tác"
                onCancel={() => setIsHistoryModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setIsHistoryModalVisible(false)}>
                        Đóng
                    </Button>,
                ]}
            >
                {viewingApplication && (
                    <Table
                        dataSource={viewingApplication.history || []}
                        columns={[
                            { title: 'Hành động', dataIndex: 'action', key: 'action' },
                            { title: 'Người thực hiện', dataIndex: 'by', key: 'by' },
                            { title: 'Thời gian', dataIndex: 'timestamp', key: 'timestamp' },
                            { title: 'Lý do', dataIndex: 'reason', key: 'reason' },
                        ]}
                        rowKey={(record, index = 0) => index.toString()}
                        pagination={false}
                    />
                )}
            </Modal>
        </div>
    );
};

export default ApplicationsPage;