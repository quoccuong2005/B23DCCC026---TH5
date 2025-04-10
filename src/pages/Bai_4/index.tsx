import React, { useEffect } from 'react';
import { Card, Row, Col, Statistic, Table, Button } from 'antd';
import { useModel } from 'umi';
import { 
  TeamOutlined, 
  FormOutlined, 
  CheckCircleOutlined, 
  CloseCircleOutlined,
  FileExcelOutlined
} from '@ant-design/icons';
import FormExport from './form';

/**
 * Component chính hiển thị báo cáo thống kê
 * Hiển thị thống kê tổng quan và chi tiết theo CLB
 */
const BaoCaoThongKe: React.FC = () => {
  // Lấy dữ liệu từ model
  const { 
    thongKeChung, 
    thongKeTheoCLB, 
    loadData, 
    visible, 
    setVisible 
  } = useModel('Bai_4');

  // Tải dữ liệu khi component mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Cấu hình bảng thống kê chi tiết
  const columns = [
    {
      title: 'Tên câu lạc bộ',
      dataIndex: 'clubName',
      key: 'clubName',
    },
    {
      title: 'Đang chờ duyệt',
      dataIndex: 'pending',
      key: 'pending',
    },
    {
      title: 'Đã duyệt',
      dataIndex: 'approved',
      key: 'approved',
    },
    {
      title: 'Đã từ chối',
      dataIndex: 'rejected',
      key: 'rejected',
    },
    {
      title: 'Tổng đơn',
      key: 'total',
      render: (record: BaoCaoThongKe.ThongKeTheoCLB) => record.pending + record.approved + record.rejected
    }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1>Báo cáo và thống kê</h1>
      
      {/* Thống kê chung - hiển thị các số liệu tổng quan */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Tổng số câu lạc bộ" 
              value={thongKeChung.tongCLB}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Tổng đơn đăng ký" 
              value={thongKeChung.tongDonDangKy}
              prefix={<FormOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic 
              title="Đang chờ duyệt" 
              value={thongKeChung.pending}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic 
              title="Đã duyệt" 
              value={thongKeChung.approved}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card>
            <Statistic 
              title="Đã từ chối" 
              value={thongKeChung.rejected}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Bảng thống kê chi tiết - hiển thị thống kê theo từng CLB */}
      <Card 
        title="Chi tiết theo từng câu lạc bộ" 
        style={{ marginBottom: '24px' }}
        extra={
          <Button 
            type="primary" 
            icon={<FileExcelOutlined />} 
            onClick={() => setVisible(true)}
          >
            Xuất Excel
          </Button>
        }
      >
        <Table 
          columns={columns} 
          dataSource={thongKeTheoCLB} 
          rowKey="clubId"
          pagination={false}
        />
      </Card>

      {/* Modal xuất Excel */}
      <FormExport 
        visible={visible} 
        onClose={() => setVisible(false)} 
      />
    </div>
  );
};

export default BaoCaoThongKe;