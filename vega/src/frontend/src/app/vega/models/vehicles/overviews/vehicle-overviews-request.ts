import { OverviewsRequest } from '../../../../common/models/overviews/overviews-request';

export class VehicleOverviewsRequest extends OverviewsRequest {
    constructor (
        public makers: number[],
        public models: number[],
        public features: number[],
        public contactName: string,
        public sortBy: string,
        public desc: boolean,
        public pageSize: number,
        public pageNumber: number) {
      super(sortBy, desc, pageSize, pageNumber);
    }
}
