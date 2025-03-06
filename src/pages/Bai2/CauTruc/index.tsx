import { Button, Modal, Table } from 'antd';
import { useModel } from 'umi';
import FormCauTruc from './FormCauTruc';
import { useEffect } from 'react';
import { IColumn } from '@/components/Table/typing';
import { CauTrucDeThiInterFace } from '@/services/DeThi/typings';

const CauTrucDeThi = () => {
    const { data4, setVisible, setIsEdit, getCauTruc, visible } = useModel('dethi');
    useEffect(() => {
        getCauTruc();
        console.log(data4);
    }, []);

    const columns: IColumn<CauTrucDeThiInterFace.Record>[] = [
           
            {
                title: 'Tên cấu trúc',
                dataIndex: 'name',
                key: 'name',
                align: 'center',
                width: 100,
            },
            {
                title: 'Môn học',
                dataIndex: 'monHoc',
                key: 'monhoc',
                align: 'center',
                width: 200,
            },
            {
                title: 'Khối kiến thức',
                width: 100,
                align: 'center',
                dataIndex: 'khoiKienThuc',   
            },
            {
                title: 'Số câu dễ',
                dataIndex: 'de',
                key: 'de',
                align: 'center',
                width: 100,
            },
            {
                title: 'Số câu trung bình',
                dataIndex: 'trungBinh',
                key: 'trungBinh',
                align: 'center',
                width: 100,
            },
            {
                title: 'Số câu khó',
                dataIndex: 'kho',
                key: 'kho',
                align: 'center',
                width: 100,
            },
            
            // {
            //     title: 'Action',
            //     width: 50,
            //     align: 'center',
            //     render: (record) => {
            //         return (
            //             <div>
            //                 <Button
            //                     onClick={() => {
            //                         setVisible(true);
            //                         // setRow(record);
            //                         setIsEdit(true);
            //                     }}
            //                     type='primary'
            //                 >
            //                     Sửa lịch học
            //                 </Button>
            //             </div>
            //         );
            //     },
            // },
        ];


    return (
        <div>
            < h1>Cấu trúc đề thi</h1>
            <Button
                type='primary'
                onClick={() => {
                    setVisible(true);
                    setIsEdit(false);
                }}
            >
                Thêm cấu trúc đề thi
            </Button>


            <Table dataSource={data4} style={{marginTop:30}}  columns={columns} />


            <Modal
                destroyOnClose
                footer={false}
                // title={isEdit ? 'Thêm tiến độ môn học' : 'Thêm tiến độ môn học'}
                visible={visible}
                onOk={() => { }}
                onCancel={() => {
                    setVisible(false);
                }}
            >
                <FormCauTruc />
            </Modal>
        </div>
    )
}

export default CauTrucDeThi
