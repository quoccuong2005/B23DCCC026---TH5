import { Button, Table,  Modal, message, Input,  } from 'antd';
import {  SwapOutlined } from '@ant-design/icons';
import { useModel } from 'umi';

const { confirm } = Modal;
const { Search } = Input;
interface ThanhVien {
    handleSearch: (value: string) => void;
    showDeleteConfirm: (type: 'club' | 'application', id: number, name: string) => void;
    resetSearch: () => void;
}

const ThanhVien = ({
    handleSearch,
    showDeleteConfirm,
    resetSearch
}: ThanhVien) => {

    const {
        // CLB
        clubs,
        searchText,
        // Thành viên
        members,
        selectedMembers,
        setSelectedMembers,
        transferModalVisible,
        setTransferModalVisible,
        targetClubId,
        setTargetClubId,
        viewingClubId,
        transferMembers
    } = useModel('Bai_3');

    
    // Columns cho bảng thành viên CLB
    const memberColumns = [
        {
            title: 'Họ tên',
            dataIndex: 'fullName',
            key: 'fullName',
            sorter: (a: ClubManagement.Member, b: ClubManagement.Member) => a.fullName.localeCompare(b.fullName),
            filteredValue: searchText ? [searchText] : null,
            onFilter: (value: string, record: ClubManagement.Member) =>
                record.fullName.toLowerCase().includes(value.toLowerCase()) ||
                record.email.toLowerCase().includes(value.toLowerCase())
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'SĐT',
            dataIndex: 'phone',
            key: 'phone'
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            key: 'gender',
            filters: [
                { text: 'Nam', value: 'Nam' },
                { text: 'Nữ', value: 'Nữ' },
                { text: 'Khác', value: 'Khác' }
            ],
            onFilter: (value: string, record: ClubManagement.Member) => record.gender === value
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address'
        },
        {
            title: 'Sở trường',
            dataIndex: 'strengths',
            key: 'strengths'
        }
    ];
    return (
        <div>
            {viewingClubId && (
                <>
                    <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                        <Search
                            placeholder="Tìm kiếm thành viên"
                            onSearch={handleSearch}
                            style={{ width: 300 }}
                            allowClear
                            onClear={resetSearch}
                        />
                        {selectedMembers.length > 0 && (
                            <Button
                                icon={<SwapOutlined />}
                                onClick={() => setTransferModalVisible(true)}
                            >
                                Chuyển {selectedMembers.length} thành viên sang CLB khác
                            </Button>
                        )}
                    </div>

                    <Table
                        dataSource={members}
                        columns={memberColumns}
                        rowKey="id"
                        rowSelection={{
                            selectedRowKeys: selectedMembers,
                            onChange: (selectedRowKeys) => {
                                setSelectedMembers(selectedRowKeys as number[]);
                            }
                        }}
                    />

                    <Modal
                        title="Chuyển thành viên sang CLB khác"
                        visible={transferModalVisible}
                        onCancel={() => setTransferModalVisible(false)}
                        onOk={() => {
                            if (!targetClubId) {
                                message.error('Vui lòng chọn CLB đích');
                                return;
                            }
                            transferMembers(selectedMembers, targetClubId);
                            message.success(`Đã chuyển ${selectedMembers.length} thành viên sang CLB khác`);
                        }}
                    >
                        <p>Chọn CLB muốn chuyển đến:</p>
                        <select
                            style={{ width: '100%', padding: '8px' }}
                            onChange={(e) => setTargetClubId(Number(e.target.value))}
                            defaultValue=""
                        >
                            <option value="" disabled>-- Chọn CLB --</option>
                            {clubs
                                .filter(club => club.id !== viewingClubId && club.active)
                                .map(club => (
                                    <option key={club.id} value={club.id}>{club.name}</option>
                                ))
                            }
                        </select>
                    </Modal>
                </>
            )}
        </div>
    )
}

export default ThanhVien
