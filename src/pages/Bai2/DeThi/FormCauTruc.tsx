import { Button, Form, Input } from 'antd';
import { useModel } from 'umi';
import { Select } from "antd";
import { useEffect, useState } from 'react';
import axios from 'axios';

const FormDeThi = () => {
	const { data, data4 , data5 , data6, getCauTruc , getDeThi, getMonHoc , row, getCauHoi , isEdit, setVisible } = useModel('dethi');


	useEffect(() => {
		getMonHoc();
		getCauTruc()
		getCauHoi()
	}, []);
	
	return (
		<Form
			onFinish={(values) => {
				// console.log('🚀 ~ RandomUser ~ values:', values.cauTruc);
				// console.log(data4);
				const a = data4.filter((item: any) => item.id === values.cauTruc)
				let cauhoi = []
				let de = a[0].de 
				let trungBinh = a[0].trungBinh
				let kho = a[0].kho

				let b = data5.filter((item: any) => item.mucDo === 0)
				let c = data5.filter((item: any) => item.mucDo === 1)
				let d = data5.filter((item: any) => item.mucDo === 2)


				// Check nếu không đủ số câu hỏi theo cấu trúc thì thêm hết số câu hỏi cùng mức độ vào
				// Ví dụ: cấu trúc đề thi có 10 câu dễ
				// chỉ có 5 câu dễ => thêm hết 5 câu dễ vào
				if(b.length < de){
					b.map((item: any) => {
						cauhoi.push(item)
					})
				}else {
					for(let i = 0; i < de; i++){
						cauhoi.push(b[i])
					}
				}
				if(c.length < trungBinh){	
					c.map((item: any) => {
						cauhoi.push(item)
					})
				}
				else {
					for(let i = 0; i < trungBinh; i++){
						cauhoi.push(c[i])
					}
				}
				if(d.length < kho){
					d.map((item: any) => {
						cauhoi.push(item)
					})
				}
				else {
					for(let i = 0; i < kho; i++){
						cauhoi.push(d[i])
					}
				}
				const tenCauTruc = data4.filter((item: any) => item.id === values.cauTruc)




				const dataChange = {
					"name": values.name,
					"ngayTao": values.ngayTao,
					"monHoc": values.monHoc,
					"tenCauTruc": tenCauTruc[0].name,
					"cauHoi": cauhoi,
				}
				axios.post('http://localhost:3000/deThi', dataChange)
				.then(res => {
					console.log(res.data);
				})
				.catch(err => {	
					console.log(err);
				})
				getDeThi()
				setVisible(false);
			}}
		>
			<Form.Item
				initialValue={row?.duration}
				label='Tên đề thi'
				name='name'
				rules={[{ required: true, message: 'Please input your name!' }]}
			>
				<Input type='text' placeholder='Nhập tên đề thi' />
			</Form.Item>

			<Form.Item
				initialValue={row?.duration}
				label='Chọn ngày thi'
				name='ngayTao'
				rules={[{ required: true, message: 'Please input your name!' }]}
			>
				<Input type='date' placeholder='Nhập ngày thi' />
			</Form.Item>

			<Form.Item
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
				label='Chọn cấu trúc đề thi'
				name='cauTruc'
				rules={[{ required: true, message: 'Vui lòng chọn môn học' }]}
			>
				{/* Load option môn học */}
				<Select>
					{data4.map((item: any) => (
						<Select.Option  key={item.id} value={item.id}>
							{item.name}
						</Select.Option>
					))}
				</Select>
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

export default FormDeThi;
