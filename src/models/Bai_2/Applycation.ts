import { useState } from 'react';
import type { Application } from '../../services/Bai_2/typing';
import { fetchApplications, createApplication, updateApplication, deleteApplication, fetchClubs } from '../../services/Bai_2/applycation';
import type { Club } from '../../services/Bai_2/typing';


export default () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [clubs, setClubs] = useState<Club[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isRejectModalVisible, setIsRejectModalVisible] = useState(false);
    const [editingApplication, setEditingApplication] = useState<any>(null);
    const [rejectReason, setRejectReason] = useState<string>('');
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
    const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
    const [viewingApplication, setViewingApplication] = useState<any>(null);
    const [isHistoryModalVisible, setIsHistoryModalVisible] = useState(false);

    const fetchApplicationsFromAPI = async () => {
        setLoading(true);
        try {
            const data = await fetchApplications();
            setApplications(data);
        } catch (error) {
            console.error('Error fetching applications:', error);
        } finally {
            setLoading(false);
        }
    };


    const addApplicationToAPI = async (application: Application) => {
        setLoading(true);
        try {
            await createApplication(application);
            fetchApplicationsFromAPI();
        } catch (error) {
            console.error('Error creating application:', error);
        } finally {
            setLoading(false);
        }
    };


    const updateApplicationInAPI = async (application: Application) => {
        setLoading(true);
        try {
            await updateApplication(application);
            fetchApplicationsFromAPI();
        } catch (error) {
            console.error('Error updating application:', error);
        } finally {
            setLoading(false);
        }
    };


    const deleteApplicationFromAPI = async (id: number) => {
        setLoading(true);
        try {
            await deleteApplication(id);
            fetchApplicationsFromAPI();
        } catch (error) {
            console.error('Error deleting application:', error);
        } finally {
            setLoading(false);
        }
    };


    const fetchClubsFromAPI = async () => {
        setLoading(true);
        try {
            const data = await fetchClubs();
            setClubs(data);
        } catch (error) {
            console.error('Error fetching clubs:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        applications,
        clubs,
        loading,
        fetchApplicationsFromAPI,
        addApplicationToAPI,
        updateApplicationInAPI,
        deleteApplicationFromAPI,
        fetchClubsFromAPI,
        isModalVisible,
        setIsModalVisible,
        isRejectModalVisible,
        setIsRejectModalVisible,
        editingApplication,
        setEditingApplication,
        rejectReason,
        setRejectReason,
        selectedRowKeys,
        setSelectedRowKeys,
        isDetailModalVisible,
        setIsDetailModalVisible,
        viewingApplication,
        setViewingApplication,
        isHistoryModalVisible,
        setIsHistoryModalVisible
    };
};