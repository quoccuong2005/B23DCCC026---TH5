import React from 'react'
import type { IColumn } from '@/components/Table/typing';
import { Button, Modal, Table } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import FormMonHoc from './Form';
const TienDoHocTap = () => {

    const { data2, getTienDoHocTap, setRow, isEdit, setVisible, setIsEdit, visible } = useModel('monhoc');

    useEffect(() => {
        getTienDoHocTap();
    }
    , []);
    const columns: IColumn<MonHoc.Record>[] = [
        // {
        //     title: 'Mã môn học',
        //     dataIndex: 'address',
        //     key: 'name',
        //     width: 50,
        // },
        {
            title: 'Tên môn học',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            width: 100,
        },
        {
            title: 'Thời gian học',
            dataIndex: 'time',
            key: 'time',
            align: 'center',
            width: 200,
        },
        {
            title: 'Thời lượng học',
            width: 100,
            align: 'center',
            dataIndex: 'duration',   
            
            // render: (record) => {
            //     return (
            //         <div>
            //             <Button
            //                 // onClick={() => {
            //                 //     setVisible(true);
            //                 //     setRow(record);
            //                 //     setIsEdit(true);
            //                 // }}
            //             >
            //                 Edit
            //             </Button>
            //             <Button
            //                 style={{ marginLeft: 10 }}
            //                 onClick={() => {
            //                     const dataLocal: any = JSON.parse(localStorage.getItem('data') as any);
            //                     const newData = dataLocal.filter((item: any) => item.address !== record.address);
            //                     localStorage.setItem('data', JSON.stringify(newData));
            //                     // getDataUser();
            //                 }}
            //                 type='primary'
            //             >
            //                 Delete
            //             </Button>
            //         </div>
            //     );
            // },
        },
        {
            title: 'Nội dung đã học',
            dataIndex: 'content',
            key: 'content',
            align: 'center',
            width: 100,
        },
        {
            title: 'Ghi chú',
            dataIndex: 'note',
            key: 'note',
            align: 'center',
            width: 100,
        },
        {
			title: 'Action',
			width: 50,
			align: 'center',
			render: (record) => {
				return (
					<div>
						<Button
							onClick={() => {
								setVisible(true);
								setRow(record);
								setIsEdit(true);
							}}
                            type='primary'
						>
							Sửa lịch học
						</Button>
					</div>
				);
			},
		},
    ];
    return (
        <div>
            <h1>Tiến độ môn học</h1>
            <Button
				type='primary'
				onClick={() => {
					setVisible(true);
					setIsEdit(false);
				}}
			>
				Thêm tiến độ môn học
			</Button>
            <Table dataSource={data2} style={{marginTop:30}}  columns={columns} />
            <Modal
				destroyOnClose
				footer={false}
				title={isEdit ? 'Thêm tiến độ môn học' : 'Thêm tiến độ môn học'}
				visible={visible}
				onOk={() => {}}
				onCancel={() => {
					setVisible(false);
				}}
			>
				<FormMonHoc />
			</Modal>
        </div>
    )
}

export default TienDoHocTap
