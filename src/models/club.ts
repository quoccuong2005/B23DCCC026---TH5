import { useState } from 'react';
import { getClubs, getMembers, addClub, updateClub, deleteClub } from '@/services/Bai_1';
import { message, Form } from 'antd';

export default () => {
  const [data, setData] = useState<Club.Record[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [row, setRow] = useState<Club.Record>();
  const [memberVisible, setMemberVisible] = useState<boolean>(false);
  const [members, setMembers] = useState<Club.Member[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [previewUrl, setPreviewUrl] = useState('');

  const getDataClubs = async () => {
    setLoading(true);
    try {
      const res = await getClubs();
      setData(res);
    } catch (error) {
      message.error('Failed to fetch clubs');
    } finally {
      setLoading(false);
    }
  };

  const getDataMembers = async (clubId: number) => {
    try {
      const res = await getMembers(clubId);
      setMembers(res);
    } catch (error) {
      message.error('Failed to fetch members');
    }
  };

  const handleAdd = async (values: Omit<Club.Record, 'id'>) => {
    try {
      await addClub(values);
      message.success('Club added successfully');
      getDataClubs();
      setVisible(false);
    } catch (error) {
      message.error('Failed to add club');
    }
  };

  const handleEdit = async (id: number, values: Partial<Club.Record>) => {
    try {
      await updateClub(id, values);
      message.success('Club updated successfully');
      getDataClubs();
      setVisible(false);
    } catch (error) {
      message.error('Failed to update club');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteClub(id);
      message.success('Club deleted successfully');
      getDataClubs();
    } catch (error) {
      message.error('Failed to delete club');
    }
  };

  return {
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
    handleAdd,
    handleEdit,
    handleDelete,
    previewUrl,
    setPreviewUrl,
    form,
  };
};