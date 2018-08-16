export abstract class Overviews<TRequest, TOverview> {
    constructor (
        public request: TRequest,
        public recordsCount: number,
        public overviews: TOverview[]) {}
}
