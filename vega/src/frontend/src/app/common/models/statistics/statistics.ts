import { StatisticsItem } from './statistics-item';
export class Statistics<TRequest, TData> {
    constructor(
        public request: TRequest,
        public items: StatisticsItem<TData>[]
    ) {
    }
}
