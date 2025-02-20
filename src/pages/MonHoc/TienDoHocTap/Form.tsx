import { Button, Form, Input } from 'antd';
import { useModel } from 'umi';
import { Select } from "antd";
import { useEffect, useState } from 'react';

const FormMonHoc = () => {
	const { data,data2, getTienDoHocTap,getMonHoc, row, isEdit, setVisible } = useModel('monhoc');
	useEffect(() => {
		getMonHoc();
		getTienDoHocTap();
	}, []);
	return (
		<Form
			onFinish={(values) => {
				console.log('🚀 ~ RandomUser ~ values:', values);
				// const dataTemp = [values,...data2];
				// localStorage.setItem('tien_do', JSON.stringify(dataTemp));
				// setVisible(false);
				// getTienDoHocTap();

				const index = data.findIndex((item: any) => item.name === row?.name);
				const dataTemp: MonHoc.Record[] = [...data2];
				dataTemp.splice(index, 1, values);
				const dataLocal = isEdit ? dataTemp : [values, ...data2];
				localStorage.setItem('tien_do', JSON.stringify(dataLocal));
				setVisible(false);
				getTienDoHocTap();
                // let changeValues = {...values};
                // console.log(isEdit);
                // if(isEdit){
                //     changeValues = {...values, done: false};
                // }
				// const index = data.findIndex((item: any) => item.todo === row?.todo);
				// const dataTemp: TodoList.Record[] = [...data];
				// dataTemp.splice(index, 1, changeValues);
				// const dataLocal = isEdit ? dataTemp : [changeValues, ...data];
				// localStorage.setItem('todo', JSON.stringify(dataLocal));
				// setVisible(false);
				// getTodoList();
			}}
		>
			<Form.Item
				initialValue={row?.name}
				label='Chọn môn học'
				name='name'
				rules={[{ required: true, message: 'Please input your dateFinish todo!' }]}
			>
				<Select>
					{data.map((item: any) => (
						<Select.Option  key={item.name} value={item.name}>
							{item.name}
						</Select.Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item
				initialValue={row?.time}
				label='Thời gian học'
				name='time'
				rules={[{ required: true, message: 'Please input your time!' }]}
			>
				<Input placeholder='Nhập thời gian học' />
			</Form.Item>
			<Form.Item
				initialValue={row?.duration}
				label='Thời lượng học'
				name='duration'
				rules={[{ required: true, message: 'Please input your duration!' }]}
			>
				<Input type='number' placeholder='Nhập số buổi học' />
			</Form.Item>

			<Form.Item
				initialValue={row?.content}
				label='Nội dung'
				name='content'
				rules={[{ required: true, message: 'Please input your content!' }]}
			>
				<Input placeholder='Nhập nội dung' />
			</Form.Item>
			
			<Form.Item
				initialValue={row?.note}
				label='Ghi chú'
				name='note'
				rules={[{ required: true, message: 'Please input your note!' }]}
			>
				<Input placeholder='Nhập ghi chú' />
			</Form.Item>

			<div className='form-footer'>
				<Button htmlType='submit' type='primary'>
					{isEdit ? 'Save' : 'Insert'}
				</Button>
				<Button onClick={() => setVisible(false)}>Cancel</Button>
			</div>
		</Form>
	);
};

export default FormMonHoc;
