import { StatisticsItem } from './statistics-item';
import { EmptyStatisticsRequest } from './empty-statistics-request';
import { Statistics } from './statistics';

export class NoRequestStatistics<TData> extends Statistics<EmptyStatisticsRequest, TData> {
    constructor(
        public items: StatisticsItem<TData>[]
    ) {
        super(new EmptyStatisticsRequest(), items);
    }
}

