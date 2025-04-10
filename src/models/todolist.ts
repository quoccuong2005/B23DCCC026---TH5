import { useState } from 'react';

export default () => {
    const [data, setData] = useState([]);
    const [visible, setVisible] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [row, setRow] = useState<TodoList.Record>();

    const getTodoList = async () => {
        const dataLocal: any = JSON.parse(localStorage.getItem('todo') as any);
        if (dataLocal?.length) {
            setData(dataLocal);
        }
    };

    return {
        data,
        visible,
        setVisible,
        row,
        setRow,
        isEdit,
        setIsEdit,
        setData,
        getTodoList,
    };
};
