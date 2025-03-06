import { Button, Form, Input } from 'antd';
import { useModel } from 'umi';
import { Select } from "antd";
import { useEffect, useState } from 'react';
import axios from 'axios';

const FormCauTruc = () => {
	const { data,data3,data4,getCauTruc,getMonHoc,getKhoiKienThuc, row, isEdit, setVisible } = useModel('dethi');
	useEffect(() => {
		getMonHoc();
		getKhoiKienThuc();
		// getTienDoHocTap();
	}, []);
	return (
		<Form
			onFinish={(values) => {
				console.log('🚀 ~ RandomUser ~ values:', values);
				const dataChange = {
					"name": values.name,
					"monHoc": values.monHoc,
					"khoiKienThuc": values.khoiKienThuc,
					"de": parseInt(values.de),
					"trungBinh": parseInt(values.trungBinh),
					"kho": parseInt(values.kho)
				}
				if(!isEdit){
					axios.post('http://localhost:3000/cauTrucDeThi', dataChange)
					.then(res => {
						console.log(res);
					})
					.catch(err => {	
						console.log(err);
					})
				}
				getCauTruc()
				setVisible(false);
				console.log(dataChange);
				// const index = data.findIndex((item: any) => item.name === row?.name);
				// const dataTemp: MonHoc.Record[] = [...data2];
				// dataTemp.splice(index, 1, values);
				// const dataLocal = isEdit ? dataTemp : [values, ...data2];
				// localStorage.setItem('tien_do', JSON.stringify(dataLocal));
				// setVisible(false);
				// getTienDoHocTap();
			}}
		>
			<Form.Item
				initialValue={row?.duration}
				label='Tên cấu trúc'
				name='name'
				rules={[{ required: true, message: 'Please input your name!' }]}
			>
				<Input type='text' placeholder='Nhập tên cấu trúc đề thi' />
			</Form.Item>
			<Form.Item
				initialValue={row?.name}
				label='Chọn môn học'
				name='monHoc'
				rules={[{ required: true, message: 'Vui lòng chọn môn học' }]}
			>
				{/* Load option môn học */}
				<Select>
					{data.map((item: any) => (
						<Select.Option  key={item.id} value={item.tenMon}>
							{item.tenMon}
						</Select.Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item
				initialValue={row?.name}
				label='Chọn khối kiến thức'
				name='khoiKienThuc'
				rules={[{ required: true, message: 'Vui lòng chọn khối kiến thức' }]}
			>
				{/* Load option môn học */}
				<Select>
					{data3.map((item: any) => (
						<Select.Option  key={item.id} value={item.tenKhoi}>
							{item.tenKhoi}
						</Select.Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item
				initialValue={row?.duration}
				label='Số câu dễ'
				name='de'
				rules={[{ required: true, message: 'Please input your !' }]}
			>
				<Input type='number' placeholder='Nhập số câu dễ' />
			</Form.Item>
			<Form.Item
				initialValue={row?.duration}
				label='Số câu trung bình'
				name='trungBinh'
				rules={[{ required: true, message: 'Please input your !' }]}
			>
				<Input type='number' placeholder='Nhập số câu trung bình' />
			</Form.Item>
			<Form.Item
				initialValue={row?.duration}
				label='Số câu khó'
				name='kho'
				rules={[{ required: true, message: 'Please input your !' }]}
			>
				<Input type='number' placeholder='Nhập số câu câu khó' />
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

export default FormCauTruc;
