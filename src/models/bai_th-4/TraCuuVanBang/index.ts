import { fetchDiplomaInfo, fetchSearchStats } from '../../../services/TH4/Tracuuthongtin';
import { useInitModel } from './useInitModel';
import type { DiplomaInfo } from '../../../services/TH4/Tracuuthongtin/typing';


export default () => {
    const model = useInitModel<DiplomaInfo[]>({
        data: [],
        loading: false,
        async fetch(params: any) {
            model.setLoading(true);
            try {
                const response = await fetchDiplomaInfo(params);
                model.setData(response || []);
            } catch (error) {
                console.error('Error fetching diploma info:', error);
            } finally {
                model.setLoading(false);
            }
        },
    });

    const statsModel = useInitModel<Record<string, number>>({
        data: {},
        loading: false,
        async fetch() {
            statsModel.setLoading(true);
            try {
                const response = await fetchSearchStats();
                statsModel.setData(response || {});
            } catch (error) {
                console.error('Error fetching search stats:', error);
            } finally {
                statsModel.setLoading(false);
            }
        },
    });

    return { model, statsModel };
};