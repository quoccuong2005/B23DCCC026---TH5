import { Button, Form, Input } from 'antd';
import { useModel } from 'umi';

const FormTodoList = () => {
	const { data, getTodoList, row, isEdit, setVisible } = useModel('todolist');

	return (
		<Form
			onFinish={(values) => {
				console.log('🚀 ~ RandomUser ~ values:', values);
                let changeValues = {...values};
                console.log(isEdit);
                if(isEdit){
                    changeValues = {...values, done: false};
                }
				const index = data.findIndex((item: any) => item.todo === row?.todo);
				const dataTemp: TodoList.Record[] = [...data];
				dataTemp.splice(index, 1, changeValues);
				const dataLocal = isEdit ? dataTemp : [changeValues, ...data];
				localStorage.setItem('todo', JSON.stringify(dataLocal));
				setVisible(false);
				getTodoList();
			}}
		>
			<Form.Item
				initialValue={row?.todo}
				label='Todo'
				name='todo'
				rules={[{ required: true, message: 'Please input your todo!' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				initialValue={row?.dateFinish}
				label='Date finish'
				name='dateFinish'
				rules={[{ required: true, message: 'Please input your dateFinish todo!' }]}
			>
				<Input type='date' />
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

export default FormTodoList;
