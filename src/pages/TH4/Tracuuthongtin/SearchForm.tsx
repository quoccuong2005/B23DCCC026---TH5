import React from 'react';
import { Form, Input, Button } from 'antd';
import MyDatepicker from './MyDatepicker';

interface SearchFormProps {
    onSearch: (values: any) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
    const [form] = Form.useForm();

    const handleSearch = () => {
        form.validateFields().then((values) => {
            onSearch(values);
        });
    };
    return (
        <Form form={form} layout="vertical">
            <Form.Item label="Số hiệu văn bằng" name="so_hieu_van_bang">
                <Input placeholder="Nhập số hiệu văn bằng" />
            </Form.Item>
            <Form.Item label="Số vào sổ" name="so_vao_so">
                <Input placeholder="Nhập số vào sổ" />
            </Form.Item>
            <Form.Item label="MSV" name="ma_sinh_vien">
                <Input placeholder="Nhập MSV" />
            </Form.Item>
            <Form.Item label="Họ tên" name="ho_ten">
                <Input placeholder="Nhập họ tên" />
            </Form.Item>
            <Form.Item label="Ngày sinh" name="ngay_sinh">
                <MyDatepicker />
            </Form.Item>
            <Button type="primary" onClick={handleSearch}>
                Tra cứu
            </Button>
        </Form>
    );
};

export default SearchForm;