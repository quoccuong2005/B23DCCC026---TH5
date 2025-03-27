import React from 'react';
import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';

const MyDatepicker: React.FC<DatePickerProps> = (props) => {
    return <DatePicker {...props} style={{ width: '100%' }} />;
};

export default MyDatepicker;