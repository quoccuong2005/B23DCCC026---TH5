import React, { useEffect, useState } from 'react';
import { Tabs, Button, Table, Space, Modal, Avatar, Tag, message, Input, Tooltip, Badge } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, CheckOutlined, CloseOutlined, UserOutlined, SwapOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import moment from 'moment';
import ApplicationForm from './ApplicationForm';


const { confirm } = Modal;
const { Search } = Input;

interface DonDangKy {
    handleSearch: (value: string) => void;
    showDeleteConfirm: (type: 'club' | 'application', id: number, name: string) => void;
    resetSearch: () => void;
}

const DonDangKy = ({
    handleSearch,
    showDeleteConfirm,
    resetSearch
}: DonDangKy) => {

    const {
        // CLB
        clubs,
        searchText,
        // Đơn đăng ký
        applications,
        setCurrentApplication,
        setApplicationModalVisible,
        setApplicationModalMode,
        selectedApplications,
        setSelectedApplications,
        reviewModalVisible,
        setReviewModalVisible,
        reviewAction,
        setReviewAction,
        rejectionReason,
        setRejectionReason,
        reviewApplications,
    } = useModel('Bai_3');
    // Columns cho bảng đơn đăng ký
    const applicationColumns = [
        {
            title: 'Họ tên',
            dataIndex: 'fullName',
            key: 'fullName',
            sorter: (a: ClubManagement.Application, b: ClubManagement.Application) =>
                a.fullName.localeCompare(b.fullName),
            filteredValue: searchText ? [searchText] : null,
            onFilter: (value: string, record: ClubManagement.Application) =>
                record.fullName.toLowerCase().includes(value.toLowerCase()) ||
                record.email.toLowerCase().includes(value.toLowerCase())
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'SĐT',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'CLB đăng ký',
            dataIndex: 'clubId',
            key: 'clubId',
            render: (clubId: number) => {
                const club = clubs.find(c => c.id === clubId);
                return club ? club.name : 'N/A';
            },
            filters: clubs.map(club => ({ text: club.name, value: club.id })),
            onFilter: (value: number, record: ClubManagement.Application) => record.clubId === value
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => {
                let color = 'blue';
                if (status === 'Approved') color = 'green';
                if (status === 'Rejected') color = 'red';
                return <Tag color={color}>{status}</Tag>;
            },
            filters: [
                { text: 'Đang chờ', value: 'Pending' },
                { text: 'Đã duyệt', value: 'Approved' },
                { text: 'Đã từ chối', value: 'Rejected' }
            ],
            onFilter: (value: string, record: ClubManagement.Application) => record.status === value
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_: any, record: ClubManagement.Application) => (
                <Space size="middle">
                    <Button
                        icon={<EyeOutlined />}
                        onClick={() => {
                            setCurrentApplication(record);
                            setApplicationModalMode('view');
                            setApplicationModalVisible(true);
                        }}
                    >
                        Chi tiết
                    </Button>

                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            setCurrentApplication(record);
                            setApplicationModalMode('edit');
                            setApplicationModalVisible(true);
                        }}
                    >
                        Sửa
                    </Button>

                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => showDeleteConfirm('application', record.id, record.fullName)}
                    >
                        Xóa
                    </Button>

                    {record.status === 'Pending' && (
                        <>
                            <Button
                                type="primary"
                                icon={<CheckOutlined />}
                                onClick={() => {
                                    setReviewAction('approve');
                                    setSelectedApplications([record.id]);
                                    setReviewModalVisible(true);
                                }}
                            >
                                Duyệt
                            </Button>

                            <Button
                                danger
                                icon={<CloseOutlined />}
                                onClick={() => {
                                    setReviewAction('reject');
                                    setSelectedApplications([record.id]);
                                    setReviewModalVisible(true);
                                }}
                            >
                                Từ chối
                            </Button>
                        </>
                    )}
                </Space>
            )
        }
    ];

    return (
        <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Search
                        placeholder="Tìm kiếm đơn đăng ký"
                        onSearch={handleSearch}
                        style={{ width: 300 }}
                        allowClear
                        onChange={(e) => {
                            if (e.target.value === '') {
                                resetSearch();
                            }
                        }}
                    />
                    {selectedApplications.length > 0 && (
                        <Space style={{ marginLeft: 16 }}>
                            <Button
                                type="primary"
                                onClick={() => {
                                    setReviewAction('approve');
                                    setReviewModalVisible(true);
                                }}
                            >
                                Duyệt {selectedApplications.length} đơn
                            </Button>
                            <Button
                                danger
                                onClick={() => {
                                    setReviewAction('reject');
                                    setReviewModalVisible(true);
                                }}
                            >
                                Từ chối {selectedApplications.length} đơn
                            </Button>
                        </Space>
                    )}
                </div>
                <Button
                    type="primary"
                    onClick={() => {
                        setCurrentApplication(undefined);
                        setApplicationModalMode('create');
                        setApplicationModalVisible(true);
                    }}
                >
                    Thêm đơn đăng ký
                </Button>
            </div>

            <Table
                dataSource={applications}
                columns={applicationColumns}
                rowKey="id"
                rowSelection={{
                    selectedRowKeys: selectedApplications,
                    onChange: (selectedRowKeys) => {
                        setSelectedApplications(selectedRowKeys as number[]);
                    },
                    getCheckboxProps: (record: ClubManagement.Application) => ({
                        disabled: record.status !== 'Pending' // Chỉ cho phép chọn các đơn đang chờ
                    })
                }}
            />

            <Modal
                title={reviewAction === 'approve' ? 'Duyệt đơn đăng ký' : 'Từ chối đơn đăng ký'}
                visible={reviewModalVisible}
                onCancel={() => setReviewModalVisible(false)}
                onOk={() => {
                    if (reviewAction === 'reject' && !rejectionReason) {
                        message.error('Vui lòng nhập lý do từ chối');
                        return;
                    }
                    reviewApplications(selectedApplications, reviewAction, rejectionReason);
                    message.success(
                        `Đã ${reviewAction === 'approve' ? 'duyệt' : 'từ chối'} ${selectedApplications.length} đơn đăng ký`
                    );
                }}
            >
                {reviewAction === 'approve' ? (
                    <p>Bạn có chắc chắn muốn duyệt {selectedApplications.length} đơn đăng ký đã chọn?</p>
                ) : (
                    <>
                        <p>Vui lòng nhập lý do từ chối:</p>
                        <Input.TextArea
                            rows={4}
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder="Lý do từ chối đơn đăng ký"
                        />
                    </>
                )}
            </Modal>

            <ApplicationForm clubs={clubs} />
        </div>
    )
}

export default DonDangKy
