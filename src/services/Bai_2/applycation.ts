import { request } from 'umi';
import { Application } from './typing';



export const fetchApplications = async (): Promise<Application[]> => {
    return request('http://localhost:5000/applications', {
        method: 'GET',
    });
};


export const createApplication = async (application: Application): Promise<void> => {
    return request('http://localhost:5000/applications', {
        method: 'POST',
        data: application,
    });
};


export const updateApplication = async (application: Application): Promise<void> => {
    return request(`http://localhost:5000/applications/${application.id}`, {
        method: 'PUT',
        data: application,
    });
};


export const deleteApplication = async (id: number): Promise<void> => {
    return request(`http://localhost:5000/applications/${id}`, {
        method: 'DELETE',
    });
};

export const fetchClubs = async (): Promise<{ id: number; name: string }[]> => {
    return request('http://localhost:5000/clubs', {
        method: 'GET',
    });
};

export const fetchRejectReasons = async (): Promise<{ id: number; reason: string }[]> => {
    return request('http://localhost:5000/reject-reasons', {
        method: 'GET',
    });
};