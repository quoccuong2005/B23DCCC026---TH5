import  { useEffect, } from 'react';
import { Button, Table, Space, Avatar, Tag, Input } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import ClubForm from './Form';

import moment from 'moment';

interface Club {
    handleSearch: (value: string) => void;
    showDeleteConfirm: (type: 'club' | 'application', id: number, name: string) => void;
    resetSearch: () => void;
}

const { Search } = Input;
const Club = ({
    handleSearch,
    showDeleteConfirm,
    resetSearch
}: Club) => {


    
    const {
        // CLB
        clubs,
        setCurrentClub,
        setClubModalVisible,
        setClubModalMode,
        fetchClubs,
        searchText,
		setActiveTab,

        // Thành viênn
        setViewingClubId,
        fetchMembers,
    } = useModel('Bai_3');

    useEffect(() => {
        fetchClubs();
    }, []);

    // Columns cho bảng CLB
    const clubColumns = [
        {
            title: 'Ảnh đại diện',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (avatar: string) => <Avatar src={avatar} size={64} />
        },
        {
            title: 'Tên câu lạc bộ',
            dataIndex: 'name',
            key: 'name',
            sorter: (a: ClubManagement.Club, b: ClubManagement.Club) => a.name.localeCompare(b.name),
            filteredValue: searchText ? [searchText] : null,
            onFilter: (value: string | number | boolean, record: ClubManagement.Club) =>
                typeof value === 'string' && record.name.toLowerCase().includes(value.toLowerCase())
        },
        {
            title: 'Ngày thành lập',
            dataIndex: 'established',
            key: 'established',
            render: (date: string) => moment(date).format('DD/MM/YYYY'),
            sorter: (a: ClubManagement.Club, b: ClubManagement.Club) =>
                moment(a.established).unix() - moment(b.established).unix()
        },
        {
            title: 'Chủ nhiệm CLB',
            dataIndex: 'president',
            key: 'president',
            sorter: (a: ClubManagement.Club, b: ClubManagement.Club) => a.president.localeCompare(b.president)
        },
        {
            title: 'Hoạt động',
            dataIndex: 'active',
            key: 'active',
            render: (active: boolean) => (
                <Tag color={active ? 'green' : 'red'}>
                    {active ? 'Có' : 'Không'}
                </Tag>
            ),
            filters: [
                { text: 'Có', value: true },
                { text: 'Không', value: false }
            ],
            onFilter: (value: string | number | boolean, record: ClubManagement.Club) =>
                typeof value === 'boolean' && record.active === value
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_: any, record: ClubManagement.Club) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            setCurrentClub(record);
                            setClubModalMode('edit');
                            setClubModalVisible(true);
                        }}
                    >
                        Sửa
                    </Button>

                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => showDeleteConfirm('club', record.id, record.name)}
                    >
                        Xóa
                    </Button>

                    <Button
                        icon={<EyeOutlined />}
                        onClick={() => {
                            setViewingClubId(record.id);
                            fetchMembers(record.id);
                            setActiveTab('3');
                        }}
                    >
                        Xem thành viên
                    </Button>
                </Space>
            )
        }
    ];

    return (
        <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                <Search
                    placeholder="Tìm kiếm câu lạc bộ"
                    onSearch={handleSearch}
                    style={{ width: 300 }}
                    allowClear
                    onChange={(e) => {
                        if (e.target.value === '') {
                            resetSearch();
                        }
                    }}
                />
                <Button
                    type="primary"
                    onClick={() => {
                        setCurrentClub(undefined);
                        setClubModalMode('create');
                        setClubModalVisible(true);
                    }}
                >
                    Thêm CLB mới
                </Button>
            </div>

            <Table
                dataSource={clubs}
                columns={clubColumns}
                rowKey="id"
                expandable={{
                    expandedRowRender: (record) => <div dangerouslySetInnerHTML={{ __html: record.description }} />
                }}
            />

            <ClubForm />
        </div>
    )
}

export default Club
