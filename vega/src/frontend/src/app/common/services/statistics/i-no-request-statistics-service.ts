import { IStatisticsService } from './i-statistics-service';
import { EmptyStatisticsRequest } from '../../models/statistics/empty-statistics-request';

// tslint:disable-next-line:no-empty-interface
export interface INoRequestStatisticsService<TData>
    extends IStatisticsService<EmptyStatisticsRequest, TData> {
}

