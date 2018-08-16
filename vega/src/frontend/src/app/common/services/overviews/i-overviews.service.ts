import { Task } from '../../tasks/task';

export interface IOverviewsService<TOverviewsRequest, TOverviews> {
    getOverviews(request: TOverviewsRequest): Task<TOverviews>;
}
