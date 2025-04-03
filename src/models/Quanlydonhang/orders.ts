import { useState } from 'react';
import type { Order } from "../../services/Quanlydonhang/typings"
import { getOrders, saveOrders } from '../../services/Quanlydonhang/orders';

export default () => {
    const [orders, setOrders] = useState<Order[]>(getOrders());
    const [editingOrder, setEditingOrder] = useState<any>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filterStatus, setFilterStatus] = useState<string | null>(null);
    const [sortField, setSortField] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'ascend' | 'descend' | null>(null);
    const refreshOrders = () => {
        setOrders(getOrders());
    };
    // Lọc và tìm kiếm dữ liệu
    const filteredOrders = orders
        .filter((order) => {
            if (searchText) {
                return (
                    order.id.includes(searchText) ||
                    order.customer.toLowerCase().includes(searchText.toLowerCase())
                );
            }
            return true;
        })
        .filter((order) => {
            if (filterStatus) {
                return order.status === filterStatus;
            }
            return true;
        })
        .sort((a, b) => {
            if (sortField && sortOrder) {
                const valueA = a[sortField as keyof typeof a];
                const valueB = b[sortField as keyof typeof b];
                if (typeof valueA === 'number' && typeof valueB === 'number') {
                    return sortOrder === 'ascend' ? valueA - valueB : valueB - valueA;
                }
                if (typeof valueA === 'string' && typeof valueB === 'string') {
                    return sortOrder === 'ascend'
                        ? valueA.localeCompare(valueB)
                        : valueB.localeCompare(valueA);
                }
            }
            return 0;
        });
    const addOrder = (order: Order) => {
        const updatedOrders = [...orders, order];
        saveOrders(updatedOrders);
        setOrders(updatedOrders);
    };

    const updateOrder = (updatedOrder: Order) => {
        const updatedOrders = orders.map((order) =>
            order.id === updatedOrder.id ? updatedOrder : order
        );
        saveOrders(updatedOrders);
        setOrders(updatedOrders);
    };

    const deleteOrder = (id: string) => {
        const updatedOrders = orders.filter((order) => order.id !== id);
        saveOrders(updatedOrders);
        setOrders(updatedOrders);
    };

    return {
        orders,
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
        setSortOrder,
        filteredOrders,
    };
};