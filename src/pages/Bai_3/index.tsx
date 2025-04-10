import React, { useEffect } from 'react';
import { Tabs,  Modal,  message,  Badge } from 'antd';
import { useModel } from 'umi';
import Club from './Club';
import DonDangKy from './Don_dang_ky';
import ThanhVien from './ThanhVien';

const { TabPane } = Tabs;
const { confirm } = Modal;

const ClubManagement: React.FC = () => {
    const {
        // CLB
        clubs,
        fetchClubs,
        removeClub,
        fetchApplications,
        removeApplication,
        activeTab,
        setActiveTab,
        setSearchText,

        // Thành viên
        viewingClubId,
        fetchMembers,
    } = useModel('Bai_3');

    useEffect(() => {
        fetchClubs();
        fetchApplications();
    }, []);

    useEffect(() => {
        if (activeTab === '3' && viewingClubId) {
            fetchMembers(viewingClubId);
        }
    }, [activeTab, viewingClubId]);

    

    const showDeleteConfirm = (type: 'club' | 'application', id: number, name: string) => {
        confirm({
            title: `Bạn có chắc chắn muốn xóa ${type === 'club' ? 'câu lạc bộ' : 'đơn đăng ký'} này?`,
            content: `${type === 'club' ? 'Câu lạc bộ' : 'Đơn đăng ký'}: ${name}`,
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
                if (type === 'club') {
                    removeClub(id);
                    message.success('Xóa câu lạc bộ thành công');
                } else {
                    removeApplication(id);
                    message.success('Xóa đơn đăng ký thành công');
                }
            }
        });
    };

    const handleSearch = (value: string) => {
        setSearchText(value);
    };

    const resetSearch = () => {
        setSearchText('');
    };

    // Lấy câu lạc bộ hiện tại đang xem thành viên
    const currentClubName = viewingClubId
        ? clubs.find(c => c.id === viewingClubId)?.name
        : '';

    return (
        <div className="club-management">
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
                <TabPane tab="Quản lý CLB" key="1">
                    <Club handleSearch={handleSearch} showDeleteConfirm={showDeleteConfirm} resetSearch={resetSearch} />
                </TabPane>
                <TabPane tab="Quản lý đơn đăng ký" key="2">
                    <DonDangKy handleSearch={handleSearch} showDeleteConfirm={showDeleteConfirm} resetSearch={resetSearch} />
                </TabPane>

                <TabPane
                    tab={
                        <span>
                            Quản lý thành viên CLB
                            {currentClubName && <Badge count={currentClubName} style={{ marginLeft: 8 }} />}
                        </span>
                    }
                    key="3"
                    disabled={!viewingClubId}
                >
                    <ThanhVien handleSearch={handleSearch} showDeleteConfirm={showDeleteConfirm} resetSearch={resetSearch} />
                </TabPane>
            </Tabs>
        </div>
    );
};

export default ClubManagement;
