import { Modal, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';


export default ({ visible, onCancel, members }: Club.Props) => {
  const columns: ColumnsType<Club.Member> = [
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
      sorter: (a, b) => a.fullName.localeCompare(b.fullName)
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone'
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (gender: string) => (
        <Tag color={gender === 'Nam' ? 'blue' : 'pink'}>
          {gender}
        </Tag>
      )
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Strengths',
      dataIndex: 'strengths',
      key: 'strengths',
      render: (strengths: string) => (
        <Tag color="green">{strengths}</Tag>
      )
    }
  ];

  return (
    <Modal
      visible={visible}
      title="Club Members"
      onCancel={onCancel}
      width={1000}
      footer={null}
    >
      <Table
        columns={columns}
        dataSource={members}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </Modal>
  );
};