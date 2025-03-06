import { Button, Modal, Table } from 'antd';
import { useModel } from 'umi';
import FormCauTruc from './FormCauTruc';
import { useEffect } from 'react';
import { IColumn } from '@/components/Table/typing';
import { DeThiInterFace } from '@/services/DeThi/typings';

const CauTrucDeThi = () => {
    const { data6, setVisible, setIsEdit,getDeThi, visible } = useModel('dethi');
    useEffect(() => {
        getDeThi();
        console.log(data6);
    }, []);

    const columns: IColumn<DeThiInterFace.Record>[] = [
           
            {
                title: 'Tên đề thi',
                dataIndex: 'name',
                key: 'name',
                align: 'center',
                width: 100,
            },
            {
                title: 'Tên cấu trúc đề',
                dataIndex: 'tenCauTruc',
                key: 'tenCauTruc',
                align: 'center',
                width: 100,
            },
            {
                title: 'Ngày thi',
                width: 100,
                align: 'center',
                dataIndex: 'ngayTao',   
            },
            {
                title: 'Môn học',
                dataIndex: 'monHoc',
                key: 'monhoc',
                align: 'center',
                width: 200,
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
            < h1>Quản lý đề thi</h1>
            <Button
                type='primary'
                onClick={() => {
                    setVisible(true);
                    setIsEdit(false);
                }}
            >
                Thêm đề thi
            </Button>


            <Table dataSource={data6} style={{marginTop:30}}  columns={columns} />


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
