import React, { useEffect } from 'react';
import { Table, Descriptions } from 'antd';
import useDiplomaModel from '../../../models/bai_th-4/TraCuuVanBang/index';
import SearchForm from './SearchForm';


const DiplomaSearchPage: React.FC = () => {
    const { model: diplomaModel, statsModel } = useDiplomaModel();

    useEffect(() => {
        statsModel.fetch({});
    }, []);

    const handleSearch = (values: any) => {
        const filledFields = Object.values(values).filter((v) => v);
        if (filledFields.length < 2) {
            alert('Vui lòng nhập ít nhất 2 tham số tìm kiếm!');
            return;
        }
        diplomaModel.fetch(values);
    };

    const columns = [
        {
            title: 'Số hiệu văn bằng',
            dataIndex: 'so_hieu_van_bang',
            key: 'so_hieu_van_bang',
        },
        {
            title: 'Số vào sổ',
            dataIndex: 'so_vao_so',
            key: 'so_vao_so',
        },
        {
            title: 'MSV',
            dataIndex: 'ma_sinh_vien',
            key: 'ma_sinh_vien',
        },
        {
            title: 'Họ tên',
            dataIndex: 'ho_ten',
            key: 'ho_ten',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'ngay_sinh',
            key: 'ngay_sinh',
        },
        {
            title: 'Quyết định tốt nghiệp',
            dataIndex: 'quyet_dinh_id',
            key: 'quyet_dinh_id',
        },
        {
            title: 'Điểm trung bình',
            dataIndex: 'diem_trung_binh',
            key: 'diem_trung_binh',
        },
        {
            title: 'Xếp loại',
            dataIndex: 'xep_loai',
            key: 'xep_loai',
        },
        {
            title: 'Hệ đào tạo',
            dataIndex: 'he_dao_tao',
            key: 'he_dao_tao',
        },
        {
            title: 'Nơi sinh',
            dataIndex: 'noi_sinh',
            key: 'noi_sinh',
        },
        {
            title: 'Dân tộc',
            dataIndex: 'dan_toc',
            key: 'dan_toc',
        }
    ];

    return (
        <div>
            <SearchForm onSearch={handleSearch} />
            <Table
                columns={columns}
                dataSource={diplomaModel.data}
                rowKey="id"
                loading={diplomaModel.loading}
                style={{ marginTop: 20 }}
            />
            {Object.keys(statsModel.data).length > 0 && (
                <Descriptions title="Thống kê tra cứu" bordered style={{ marginTop: 20 }}>
                    {Object.entries(statsModel.data).map(([key, value]) => (
                        <Descriptions.Item label={key} key={key}>
                            {value}
                        </Descriptions.Item>
                    ))}
                </Descriptions>
            )}
        </div>
    );
};

export default DiplomaSearchPage;