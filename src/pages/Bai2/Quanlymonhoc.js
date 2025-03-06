
import { Button, Input, Table, Tooltip, Modal, Form, Select } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import quanlymonhoc from "@/models/quanlymonhoc";
import { KhoiKienThucService } from "../services/khoikienthuc";
const MonHocComponent = () => {
    const {
        data, visible, setVisible, row, setRow, isEdit, setIsEdit,
        getDataMonHoc, addMonHoc, updateMonHoc, deleteMonHoc
    } = quanlymonhoc();

    const [monHocData, setMonHocData] = useState({
        maMon: "",
        tenMon: "",
        soTinChi: 0,
        khoiKienThucId: ""
    });
    const [khoiKienThuc, setKhoiKienThuc] = useState([]);
    const fetchKhoiKienThuc = async () => {
        const res = await KhoiKienThucService.getAll();
        setKhoiKienThuc(res);
    };

    useEffect(() => {
        getDataMonHoc();
        fetchKhoiKienThuc()
    }, []);

    const handleOpenModal = (monHoc = null) => {
        if (monHoc) {
            setIsEdit(true);
            setRow(monHoc);
            setMonHocData(monHoc);
        } else {
            setIsEdit(false);
            setRow(null);
            setMonHocData({ maMon: "", tenMon: "", soTinChi: 0, khoiKienThucId: "" });
        }
        setVisible(true);
    };


    const handleSave = async () => {
        if (isEdit && row) {
            await updateMonHoc(row.id, monHocData);
        } else {
            await addMonHoc(monHocData);
        }
        setVisible(false);
    };

    return (
        <div>
            <h1>Quản lý Môn Học</h1>
            <Button onClick={() => handleOpenModal()} icon={<PlusOutlined />}>Thêm Môn Học</Button>

            <Table dataSource={data} rowKey="id" columns={[
                { title: "Mã Môn", dataIndex: "maMon" },
                { title: "Tên Môn", dataIndex: "tenMon" },
                { title: "Số Tín Chỉ", dataIndex: "soTinChi" },
                {
                    title: "Khối Kiến Thức",
                    dataIndex: "khoiKienThucId",
                    render: (khoiKienThucId) => khoiKienThuc.find(k => k.id === khoiKienThucId)?.tenKhoi || "N/A"
                },
                {
                    title: "Hành Động", render: (_, record) => (
                        <>
                            <Tooltip title="Sửa">
                                <Button type="primary" icon={<EditOutlined />} onClick={() => handleOpenModal(record)} />
                            </Tooltip>
                            <Tooltip title="Xóa">
                                <Button danger icon={<DeleteOutlined />} onClick={() => deleteMonHoc(record.id)} />
                            </Tooltip>
                        </>
                    )
                },
            ]} />


            <Modal title={isEdit ? "Chỉnh sửa Môn Học" : "Thêm Môn Học"} visible={visible} onCancel={() => setVisible(false)} onOk={handleSave}>
                <Form layout="vertical">
                    <Form.Item label="Mã môn">
                        <Input value={monHocData.maMon} onChange={(e) => setMonHocData({ ...monHocData, maMon: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="Tên môn">
                        <Input value={monHocData.tenMon} onChange={(e) => setMonHocData({ ...monHocData, tenMon: e.target.value })} />
                    </Form.Item>
                    <Form.Item label="Số tín chỉ">
                        <Input type="number" value={monHocData.soTinChi} onChange={(e) => setMonHocData({ ...monHocData, soTinChi: parseInt(e.target.value) || 0 })} />
                    </Form.Item>
                    <Form.Item label="Khối Kiến Thức">
                        <Select value={monHocData.khoiKienThucId} onChange={(value) => setMonHocData({ ...monHocData, khoiKienThucId: value })}>
                            {khoiKienThuc.map(khoi => (
                                <Select.Option key={khoi.id} value={khoi.id}>{khoi.tenKhoi}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default MonHocComponent;
