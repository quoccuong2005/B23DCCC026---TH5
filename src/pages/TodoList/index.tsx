import React from 'react'
import type { IColumn } from '@/components/Table/typing';
import { Button, Modal, Table } from 'antd';
import { useEffect } from 'react';
import { useModel } from 'umi';
import FormTodoList from './Form';
const TodoList = () => {

    const { data, getTodoList, setRow, isEdit, setVisible, setIsEdit, visible } = useModel('todolist');
    
    useEffect(() => {
        getTodoList();
    }, []);

    const columns: IColumn<TodoList.Record>[] = [
            {
                title: 'Todo',
                dataIndex: 'todo',
                key: 'todo',
                align: 'center',
                width: 200,
            },
            {
                title: 'Date Finish',
                dataIndex: 'dateFinish',
                key: 'dateFinish',
                align: 'center',
                width: 100,
            },
            {
                title: 'Status',
                dataIndex: 'done',
                key: 'done',
                align: 'center',
                width: 100,
                render: (record) => {
                    return record ? 'Done' : 'Not Done';
                },
            },
            {
                title: 'Action',
                width: 200,
                align: 'center',
                render: (record) => {
                    return (
                        <div>
                            <Button
                                type='ghost'
                                style={{ marginRight: 10 }}
                                onClick={() => {
                                    const dataLocal: any = JSON.parse(localStorage.getItem('todo') as any);
                                    const index = dataLocal.findIndex((item: any) => item.todo === record.todo);
                                    const changeValues = { ...record, done: true };
                                    const dataTemp: TodoList.Record[] = [...dataLocal];
                                    dataTemp.splice(index, 1, changeValues);
                                    localStorage.setItem('todo', JSON.stringify(dataTemp));
                                    getTodoList();
                                }}
                            >
                                Done
                            </Button>
                            <Button
                                onClick={() => {
                                    setVisible(true);
                                    setRow(record);
                                    setIsEdit(true);
                                }}
                            >
                                Edit
                            </Button>
                            <Button
                                style={{ marginLeft: 10 }}
                                onClick={() => {
                                    const dataLocal: any = JSON.parse(localStorage.getItem('todo') as any);
                                    const newData = dataLocal.filter((item: any) => item.todo !== record.todo);
                                    localStorage.setItem('todo', JSON.stringify(newData));
                                    getTodoList();
                                }}
                                type='primary'
                            >
                                Delete
                            </Button>
                        </div>
                    );
                },
            },
        ];

    return (
        <div>
            <Button
                type='primary'
                onClick={() => {
                    setVisible(true);
                    setIsEdit(false);
                    setRow(undefined);
                }}
            >
                Add TodoList
            </Button>

            <div style={{marginTop:30}}>
                <Table dataSource={data} columns={columns} />
            </div>

            <Modal
				destroyOnClose
				footer={false}
				title={isEdit ? 'Edit Todo' : 'Add Todo'}
				visible={visible}
				onOk={() => {}}
				onCancel={() => {
					setVisible(false);
				}}
			>
				<FormTodoList />
			</Modal>
        </div>
    )
}

export default TodoList
