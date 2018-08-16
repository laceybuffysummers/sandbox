export class OverviewsRequest {
    constructor (
        public sortBy: string,
        public desc: boolean,
        public pageSize: number,
        public pageNumber: number) {}
}
