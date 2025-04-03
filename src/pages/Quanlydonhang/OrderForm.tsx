import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button, InputNumber } from 'antd';
import type { Order, OrderFormProps } from '../../services/Quanlydonhang/typings';
import { customers, products } from '../../services/Quanlydonhang/orders';


const OrderForm: React.FC<OrderFormProps> = ({ visible, onClose, onSubmit, initialValues }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        } else {
            form.resetFields();
        }
    }, [initialValues]);
    const handleFinish = (values: any) => {
        const order: Order = {
            ...values,
            id: initialValues?.id || Date.now().toString(),
            totalAmount: values.products.reduce(
                (sum: number, product: any) => sum + product.price * product.quantity,
                0
            ),
        };
        onSubmit(order);
        form.resetFields();
    };
    return (
        <Modal
            visible={visible}
            title={initialValues ? 'Chỉnh sửa đơn hàng' : 'Thêm mới đơn hàng'}
            onCancel={onClose}
            footer={null}
        >
            <Form form={form} onFinish={handleFinish} initialValues={initialValues}>
                <Form.Item
                    name="customer"
                    label="Khách hàng"
                    rules={[{ required: true, message: 'Vui lòng chọn khách hàng!' }]}
                >
                    <Select placeholder="Chọn khách hàng">
                        {customers.map((customer) => (
                            <Select.Option key={customer.id} value={customer.name}>
                                {customer.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="orderDate" label="Ngày đặt hàng" rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}>
                    <Input type="date" />
                </Form.Item>
                <Form.Item name="status" label="Trạng thái" rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}>
                    <Select>
                        <Select.Option value="Chờ xác nhận">Chờ xác nhận</Select.Option>
                        <Select.Option value="Đang giao">Đang giao</Select.Option>
                        <Select.Option value="Hoàn thành">Hoàn thành</Select.Option>
                        <Select.Option value="Hủy">Hủy</Select.Option>
                    </Select>
                </Form.Item>
                <Form.List name="products">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                <div key={key} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>

                                    <Form.Item
                                        {...restField}
                                        name={[name, 'name']}
                                        fieldKey={[fieldKey ?? key, 'name']}
                                        rules={[{ required: true, message: 'Chọn sản phẩm!' }]}
                                    >
                                        <Select
                                            placeholder="Chọn sản phẩm"
                                            onChange={(value) => {
                                                const selectedProduct = products.find((product) => product.name === value);
                                                if (selectedProduct) {
                                                    form.setFieldsValue({
                                                        products: form.getFieldValue('products').map((product: any, index: number) =>
                                                            index === name ? { ...product, price: selectedProduct.price } : product
                                                        ),
                                                    });
                                                }
                                            }}
                                        >
                                            {products.map((product) => (
                                                <Select.Option key={product.id} value={product.name}>
                                                    {product.name}
                                                </Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>


                                    <Form.Item
                                        {...restField}
                                        name={[name, 'price']}
                                        fieldKey={[fieldKey ?? key, 'price']}
                                        rules={[{ required: true, message: 'Nhập giá!' }]}
                                    >
                                        <InputNumber placeholder="Giá" disabled />
                                    </Form.Item>


                                    <Form.Item
                                        {...restField}
                                        name={[name, 'quantity']}
                                        fieldKey={[fieldKey ?? key, 'quantity']}
                                        rules={[{ required: true, message: 'Nhập số lượng!' }]}
                                    >
                                        <InputNumber placeholder="Số lượng" />
                                    </Form.Item>


                                    <Button onClick={() => remove(name)}>Xóa</Button>
                                </div>
                            ))}
                            <Button onClick={() => add()} type="dashed" style={{ width: '100%' }}>
                                Thêm sản phẩm
                            </Button>
                        </>
                    )}
                </Form.List>
                <Button type="primary" htmlType="submit">
                    Lưu
                </Button>
            </Form>
        </Modal>
    );
};

export default OrderForm;