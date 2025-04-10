declare module ClubManagement {
  // Định nghĩa type cho CLB
  export interface Club {
    id: number;
    avatar: string;
    name: string;
    established: string;
    description: string;
    president: string;
    active: boolean;
  }

  // Định nghĩa type cho đơn đăng ký
  export interface Application {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    gender: string;
    address: string;
    strengths: string;
    clubId: number;
    reason: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    note: string;
    history: ApplicationHistory[];
  }

  // Định nghĩa type cho lịch sử đơn đăng ký
  export interface ApplicationHistory {
    action: string;
    by: string;
    timestamp: string;
    reason: string;
  }

  // Định nghĩa type cho thành viên CLB
  export interface Member {
    id: number;
    fullName: string;
    email: string;
    phone: string;
    gender: string;
    address: string;
    strengths: string;
    clubId: number;
  }
}