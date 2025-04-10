import { useState } from 'react';
import {
	getClubs,
	createClub,
	updateClub,
	deleteClub,
	getApplications,
	createApplication,
	updateApplication,
	deleteApplication,
	getMembers,
	updateMember,
	createMember,
} from '@/services/Bai_3';

export default () => {
	// State quản lý CLB
	const [clubs, setClubs] = useState<ClubManagement.Club[]>([]);
	const [currentClub, setCurrentClub] = useState<ClubManagement.Club>();
	const [clubModalVisible, setClubModalVisible] = useState(false);
	const [clubModalMode, setClubModalMode] = useState<'create' | 'edit'>('create');

	// State quản lý đơn đăng ký
	const [applications, setApplications] = useState<ClubManagement.Application[]>([]);
	const [currentApplication, setCurrentApplication] = useState<ClubManagement.Application>();
	const [applicationModalVisible, setApplicationModalVisible] = useState(false);
	const [applicationModalMode, setApplicationModalMode] = useState<'create' | 'edit' | 'view'>('create');
	const [selectedApplications, setSelectedApplications] = useState<number[]>([]);
	const [reviewModalVisible, setReviewModalVisible] = useState(false);
	const [reviewAction, setReviewAction] = useState<'approve' | 'reject'>('approve');
	const [rejectionReason, setRejectionReason] = useState('');

	// State quản lý thành viên
	const [members, setMembers] = useState<ClubManagement.Member[]>([]);
	const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
	const [transferModalVisible, setTransferModalVisible] = useState(false);
	const [targetClubId, setTargetClubId] = useState<number>();
	const [viewingClubId, setViewingClubId] = useState<number>();
	const [activeTab, setActiveTab] = useState('1');
	const [searchText, setSearchText] = useState('');

	// Fetch dữ liệu CLB
	const fetchClubs = async () => {
		try {
			const data = await getClubs();
			setClubs(data);
			return data;
		} catch (error) {
			console.error('Failed to fetch clubs:', error);
		}
	};

	// Thêm CLB mới
	const addClub = async (club: Omit<ClubManagement.Club, 'id'>) => {
		try {
			await createClub(club);
			await fetchClubs();
			setClubModalVisible(false);
		} catch (error) {
			console.error('Failed to add club:', error);
		}
	};

	// Cập nhật CLB
	const editClub = async (id: number, club: Partial<ClubManagement.Club>) => {
		try {
			await updateClub(id, club);
			await fetchClubs();
			setClubModalVisible(false);
		} catch (error) {
			console.error('Failed to update club:', error);
		}
	};

	// Xóa CLB
	const removeClub = async (id: number) => {
		try {
			await deleteClub(id);
			await fetchClubs();
		} catch (error) {
			console.error('Failed to delete club:', error);
		}
	};

	// Fetch đơn đăng ký
	const fetchApplications = async () => {
		try {
			const data = await getApplications();
			setApplications(data);
			return data;
		} catch (error) {
			console.error('Failed to fetch applications:', error);
		}
	};

	// Thêm đơn đăng ký mới
	const addApplication = async (application: Omit<ClubManagement.Application, 'id'>) => {
		try {
			await createApplication({
				...application,
				status: 'Pending',
				history: [],
			});
			await fetchApplications();
			setApplicationModalVisible(false);
		} catch (error) {
			console.error('Failed to add application:', error);
		}
	};

	// Cập nhật đơn đăng ký
	const editApplication = async (id: number, application: Partial<ClubManagement.Application>) => {
		try {
			await updateApplication(id, application);
			await fetchApplications();
			setApplicationModalVisible(false);
		} catch (error) {
			console.error('Failed to update application:', error);
		}
	};

	// Xóa đơn đăng ký
	const removeApplication = async (id: number) => {
		try {
			await deleteApplication(id);
			await fetchApplications();
		} catch (error) {
			console.error('Failed to delete application:', error);
		}
	};

	// Duyệt/từ chối đơn đăng ký
	const reviewApplications = async (ids: number[], action: 'approve' | 'reject', reason = '') => {
		try {
			const timestamp = new Date().toISOString();

			// Lấy thông tin hiện tại của các đơn
			const currentApps = await getApplications();

			// Xử lý từng đơn
			for (const id of ids) {
				const app = currentApps.find((a: ClubManagement.Application) => a.id === id);
				if (!app) continue;

				const historyEntry: ClubManagement.ApplicationHistory = {
					action: action === 'approve' ? 'Approved' : 'Rejected',
					by: 'admin', // Tạm thời hardcode, sau này sẽ lấy từ context user
					timestamp,
					reason: action === 'reject' ? reason : '',
				};

				// Cập nhật đơn
				await updateApplication(id, {
					status: action === 'approve' ? 'Approved' : 'Rejected',
					note: action === 'reject' ? reason : '',
					history: [...app.history, historyEntry],
				});

				// Nếu duyệt đơn, thêm vào danh sách thành viên
				if (action === 'approve') {
					await createMember({
						fullName: app.fullName,
						email: app.email,
						phone: app.phone,
						gender: app.gender,
						address: app.address,
						strengths: app.strengths,
						clubId: app.clubId,
					});
				}
			}

			await fetchApplications();
			setReviewModalVisible(false);
			setRejectionReason('');
			setSelectedApplications([]);
		} catch (error) {
			console.error('Failed to review applications:', error);
		}
	};

	// Fetch thành viên
	const fetchMembers = async (clubId?: number) => {
		try {
			const data = await getMembers(clubId);
			setMembers(data);
			return data;
		} catch (error) {
			console.error('Failed to fetch members:', error);
		}
	};

	// Chuyển CLB cho thành viên
	const transferMembers = async (memberIds: number[], newClubId: number) => {
		try {
			for (const id of memberIds) {
				await updateMember(id, { clubId: newClubId });
			}
			await fetchMembers(viewingClubId);
			setTransferModalVisible(false);
			setSelectedMembers([]);
		} catch (error) {
			console.error('Failed to transfer members:', error);
		}
	};

	return {
		// CLB
		clubs,
		currentClub,
		setCurrentClub,
		clubModalVisible,
		setClubModalVisible,
		clubModalMode,
		setClubModalMode,
		fetchClubs,
		addClub,
		editClub,
		removeClub,
		activeTab,
		setActiveTab,
		searchText,
		setSearchText,

		// Đơn đăng ký
		applications,
		currentApplication,
		setCurrentApplication,
		applicationModalVisible,
		setApplicationModalVisible,
		applicationModalMode,
		setApplicationModalMode,
		selectedApplications,
		setSelectedApplications,
		reviewModalVisible,
		setReviewModalVisible,
		reviewAction,
		setReviewAction,
		rejectionReason,
		setRejectionReason,
		fetchApplications,
		addApplication,
		editApplication,
		removeApplication,
		reviewApplications,

		// Thành viên
		members,
		selectedMembers,
		setSelectedMembers,
		transferModalVisible,
		setTransferModalVisible,
		targetClubId,
		setTargetClubId,
		viewingClubId,
		setViewingClubId,
		fetchMembers,
		transferMembers,
	};
};
