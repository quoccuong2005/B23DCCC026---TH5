import { type Order } from './typings';
const STORAGE_KEY = 'orders';

export const getOrders = (): Order[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
};

export const saveOrders = (orders: Order[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
};

export const addOrder = (order: Order) => {
    const orders = getOrders();
    orders.push(order);
    saveOrders(orders);
};

export const updateOrder = (updatedOrder: Order) => {
    const orders = getOrders().map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
    );
    saveOrders(orders);
};

export const deleteOrder = (id: string) => {
    const orders = getOrders().filter((order) => order.id !== id);
    saveOrders(orders);
};
// Danh sách khách hàng có sẵn
export const customers = [
    { id: 'C001', name: 'Nguyen Van A' },
    { id: 'C002', name: 'Tran Thi B' },
    { id: 'C003', name: 'Le Van C' },
];

// Danh sách sản phẩm có sẵn
export const products = [
    { id: 'P001', name: 'Sản phẩm 1', price: 100000 },
    { id: 'P002', name: 'Sản phẩm 2', price: 200000 },
    { id: 'P003', name: 'Sản phẩm 3', price: 300000 },
];