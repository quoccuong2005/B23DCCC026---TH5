export interface Order {
    id: string;
    customer: string;
    orderDate: string;
    totalAmount: number;
    status: 'Chờ xác nhận' | 'Đang giao' | 'Hoàn thành' | 'Hủy';
    products: { name: string; price: number; quantity: number }[];
}
interface OrderFormProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (order: Order) => void;
    initialValues?: Order;
}