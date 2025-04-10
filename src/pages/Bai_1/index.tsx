import { useModel } from 'umi';
import { Table, Button, Space, Modal, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import ClubForm from './Form';
import MemberList from './MemberList';
import { SearchOutlined } from '@ant-design/icons';

export default () => {
  const { 
    data,
    loading,
    visible,
    setVisible,
    isEdit,
    setIsEdit,
    row,
    setRow,
    memberVisible,
    setMemberVisible,
    members,
    getDataClubs,
    getDataMembers,
    handleDelete 
  } = useModel('club');

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getDataClubs();
  }, []);

  const handleEdit = (record: Club.Record) => {
    setRow(record);
    setIsEdit(true);
    setVisible(true);
  };

  const handleViewMembers = (id: number) => {
    getDataMembers(id);
    setMemberVisible(true);
  };

  const handleDeleteConfirm = (id: number) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this club?',
      onOk: () => handleDelete(id)
    });
  };

  const columns: ColumnsType<Club.Record> = [
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text: string) => <img src={text} width={50} alt="club avatar" />
    },
    {
      title: 'Club Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Club.Record, b: Club.Record) => a.name.localeCompare(b.name),
      filterDropdown: () => (
        <Input.Search 
          placeholder="Search club name"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          style={{ width: 200, padding: 8 }}
        />
      ),
      filterIcon: () => <SearchOutlined />,
      onFilter: (value: string | number | boolean, record: Club.Record) =>
        record.name.toLowerCase().includes(String(value).toLowerCase())
    },
    {
      title: 'Established',
      dataIndex: 'established',
      key: 'established',
      sorter: (a: Club.Record, b: Club.Record) => 
        new Date(a.established).getTime() - new Date(b.established).getTime()
    },
    {
      title: 'President',
      dataIndex: 'president',
      key: 'president'
    },
    {
      title: 'Active',
      dataIndex: 'active',
      key: 'active',
      render: (active: boolean) => active ? 'Yes' : 'No',
      filters: [
        { text: 'Active', value: true },
        { text: 'Inactive', value: false }
      ],
      onFilter: (value: string | number | boolean, record: Club.Record) => record.active === Boolean(value)
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Club.Record) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDeleteConfirm(record.id)} danger>Delete</Button>
          <Button onClick={() => handleViewMembers(record.id)}>Members</Button>
        </Space>
      )
    }
  ];

  const filteredData = data.filter(item => 
    item && item.name ? item.name.toLowerCase().includes(searchText.toLowerCase()) : false
  );

  return (
    <div style={{ padding: 24 }}>
      <Button 
        type="primary" 
        onClick={() => {
          setRow(undefined);
          setIsEdit(false);
          setVisible(true);
        }}
        style={{ marginBottom: 16 }}
      >
        Add Club
      </Button>
      
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        loading={loading}
      />

      <ClubForm
        visible={visible}
        onCancel={() => setVisible(false)}
        record={row}
        isEdit={isEdit}
        members={members}
      />

      <MemberList
        visible={memberVisible}
        onCancel={() => setMemberVisible(false)}
        members={members}
        isEdit={isEdit}
      />
    </div>
  );
};