import { useState } from 'react';

interface InitModel<T> {
    data: T;
    loading: boolean;
    fetch: (params: any) => Promise<void>;
}

export function useInitModel<T>(initialState: InitModel<T>) {
    const [data, setData] = useState<T>(initialState.data);
    const [loading, setLoading] = useState<boolean>(initialState.loading);

    const fetch = async (params: any) => {
        setLoading(true);
        try {
            await initialState.fetch.call({ setData, setLoading }, params);
        } finally {
            setLoading(false);
        }
    };

    return {
        data,
        loading,
        setData,
        setLoading,
        fetch,
    };
}