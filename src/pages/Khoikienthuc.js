
import { Button, Input, Table, Tooltip } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import khoikienthuc from "@/models/khoikienthuc";

const KhoiKienThucComponent = () => {
    const { data, tenKhoi, setTenKhoi, getDataKhoiKienThuc, addKhoiKienThuc, deleteKhoiKienThuc } = khoikienthuc();

    useEffect(() => {
        getDataKhoiKienThuc();
    }, []);

    return (
        <div>
            <h1>Quản lý Khối Kiến Thức</h1>
            <Input value={tenKhoi} onChange={(e) => setTenKhoi(e.target.value)} placeholder="Nhập tên khối" />
            <Button onClick={addKhoiKienThuc} icon={<PlusOutlined />}>Thêm</Button>
            <Table dataSource={data} rowKey="id" columns={[
                { title: "ID", dataIndex: "id" },
                { title: "Tên Khối Kiến Thức", dataIndex: "tenKhoi" },
                {
                    title: "Hành Động", render: (_, record) => (
                        <Tooltip title="Xóa">
                            <Button danger icon={<DeleteOutlined />} onClick={() => deleteKhoiKienThuc(record.id)} />
                        </Tooltip>
                    )
                },
            ]} />
        </div>
    );
};

export default KhoiKienThucComponent;

