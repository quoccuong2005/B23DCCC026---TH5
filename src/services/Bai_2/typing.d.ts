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
    history: { action: string; by: string; timestamp: string; reason: string }[];
}

export interface Club {
    id: number;
    name: string;
}

interface ApplicationFormProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (application: Application) => void;
    initialValues?: Application;
}