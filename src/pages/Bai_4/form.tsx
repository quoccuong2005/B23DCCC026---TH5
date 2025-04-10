import React from 'react';
import { Modal, Radio, Select, Button, Form, Space } from 'antd';
import { useModel } from 'umi';
import { FileExcelOutlined, LoadingOutlined } from '@ant-design/icons';

const { Option } = Select;

// Props cho component FormExport
interface FormExportProps {
  visible: boolean; // Trạng thái hiển thị của modal
  onClose: () => void; // Hàm đóng modal
}

/**
 * Form xuất danh sách thành viên ra file Excel
 * Cho phép chọn xuất tất cả CLB hoặc một CLB cụ thể
 */
const FormExport: React.FC<FormExportProps> = (props) => {
  const { visible, onClose } = props;
  
  // Lấy dữ liệu từ model
  const {
    clubs,
    exportLoading,
    selectedClubId,
    setSelectedClubId,
    exportAll,
    setExportAll,
    handleExportExcel
  } = useModel('Bai_4');

  /**
   * Xử lý khi người dùng nhấn nút xuất Excel
   * Gọi hàm xuất Excel từ model và đóng modal
   */
  const handleExport = async () => {
    try {
      await handleExportExcel();
      onClose();
    } catch (error) {
      console.error('Lỗi khi xuất Excel:', error);
    }
  };

  return (
    <Modal
      title="Xuất danh sách thành viên"
      visible={visible} // Sử dụng visible cho phiên bản Ant Design 4.x
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <Form layout="vertical">
        {/* Chọn phạm vi xuất dữ liệu */}
        <Form.Item label="Phạm vi xuất dữ liệu">
          <Radio.Group 
            value={exportAll} 
            onChange={e => setExportAll(e.target.value)}
            style={{ width: '100%' }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Radio value={true}>Xuất tất cả câu lạc bộ</Radio>
              <Radio value={false}>Chỉ xuất một câu lạc bộ</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        {/* Hiển thị dropdown chọn CLB khi chọn xuất một CLB cụ thể */}
        {!exportAll && (
          <Form.Item label="Chọn câu lạc bộ">
            <Select
              placeholder="Chọn câu lạc bộ cần xuất danh sách"
              style={{ width: '100%' }}
              value={selectedClubId}
              onChange={value => setSelectedClubId(value)}
            >
              {Array.isArray(clubs) && clubs.map((club: BaoCaoThongKe.Club) => (
                <Option key={club.id} value={club.id}>
                  {club.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        {/* Nút xuất Excel và hủy */}
        <Form.Item>
          <Space>
            <Button
              type="primary"
              icon={exportLoading ? <LoadingOutlined /> : <FileExcelOutlined />}
              onClick={handleExport}
              loading={exportLoading}
              disabled={!exportAll && !selectedClubId}
            >
              {exportLoading ? 'Đang xuất...' : 'Xuất Excel'}
            </Button>
            <Button onClick={onClose}>Hủy</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormExport;