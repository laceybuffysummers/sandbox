import { Task } from './../../tasks/task';
import { Statistics } from '../../models/statistics/statistics';

export interface IStatisticsService<TRequest, TData> {
    getStatistics(request?: TRequest): Task<Statistics<TRequest, TData>>;
}
