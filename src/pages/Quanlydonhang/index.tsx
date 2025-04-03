import React, { useState } from 'react';
import { Table, Button, Select, Input, Modal, message } from 'antd';
import useOrderModel from "../../models/Quanlydonhang/orders";
import OrderForm from './OrderForm';

const { Search } = Input;
const { Option } = Select;

const OrdersPage: React.FC = () => {
    const { orders,
        refreshOrders,
        addOrder,
        updateOrder,
        deleteOrder,
        editingOrder,
        setEditingOrder,
        isModalVisible,
        setIsModalVisible,
        searchText,
        setSearchText,
        filterStatus,
        setFilterStatus,
        sortField,
        setSortField,
        sortOrder,
        setSortOrder, filteredOrders } = useOrderModel();




    const handleDelete = (id: string, status: string) => {
        if (status !== 'Chờ xác nhận') {
            message.warning('Chỉ có thể hủy đơn hàng ở trạng thái "Chờ xác nhận"!');
            return;
        }

        Modal.confirm({
            title: 'Xác nhận hủy đơn hàng',
            content: 'Bạn có chắc chắn muốn hủy đơn hàng này?',
            onOk: () => {
                deleteOrder(id);
                message.success('Hủy đơn hàng thành công!');
            },
        });
    };
    <OrderForm
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={(order) => {
            if (editingOrder) {
                updateOrder(order);
                message.success('Cập nhật đơn hàng thành công!');
            } else {
                addOrder(order); // Thêm mới đơn hàng
                message.success('Thêm đơn hàng thành công!');
            }
            setIsModalVisible(false);
        }}
        initialValues={editingOrder}
    />
    const columns = [
        { title: 'Mã đơn hàng', dataIndex: 'id', key: 'id' },
        { title: 'Khách hàng', dataIndex: 'customer', key: 'customer' },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'orderDate',
            key: 'orderDate',
            sorter: true,
            sortOrder: sortField === 'orderDate' ? sortOrder : null,
            onHeaderCell: () => ({
                onClick: () => {
                    setSortField('orderDate');
                    setSortOrder(sortOrder === 'ascend' ? 'descend' : 'ascend');
                },
            }),
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            sorter: true,
            sortOrder: sortField === 'totalAmount' ? sortOrder : null,
            onHeaderCell: () => ({
                onClick: () => {
                    setSortField('totalAmount');
                    setSortOrder(sortOrder === 'ascend' ? 'descend' : 'ascend');
                },
            }),
        },
        { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
        {
            title: 'Hành động',
            render: (record: any) => (
                <>
                    <Button onClick={() => { setEditingOrder(record); setIsModalVisible(true); }}>Sửa</Button>
                    <Button danger onClick={() => handleDelete(record.id, record.status)}>Xóa</Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 16, display: 'flex', gap: '16px' }}>
                <Search
                    placeholder="Tìm kiếm theo mã đơn hàng hoặc khách hàng"
                    onSearch={(value) => setSearchText(value)}
                    style={{ width: 300 }}
                />
                <Select
                    placeholder="Lọc theo trạng thái"
                    onChange={(value) => setFilterStatus(value)}
                    allowClear
                    style={{ width: 200 }}
                >
                    <Option value="Chờ xác nhận">Chờ xác nhận</Option>
                    <Option value="Đang giao">Đang giao</Option>
                    <Option value="Hoàn thành">Hoàn thành</Option>
                    <Option value="Hủy">Hủy</Option>
                </Select>
                <Button type="primary" onClick={() => { setEditingOrder(null); setIsModalVisible(true); }}>
                    Thêm đơn hàng
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={filteredOrders}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />
            <OrderForm
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSubmit={(order) => {
                    if (editingOrder) {
                        updateOrder(order);
                        message.success('Cập nhật đơn hàng thành công!');
                    } else {
                        addOrder(order);
                        message.success('Thêm đơn hàng thành công!');
                    }
                    setIsModalVisible(false);
                }}
                initialValues={editingOrder}
            />
        </div>
    );
};

export default OrdersPage;