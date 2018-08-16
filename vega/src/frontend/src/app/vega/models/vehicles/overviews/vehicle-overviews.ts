import { VehicleOverviewsRequest } from './vehicle-overviews-request';
import { VehicleOverview } from './vehicle-overview';
import { Overviews } from '../../../../common/models/overviews/overviews';

export class VehicleOverviews extends Overviews<VehicleOverviewsRequest, VehicleOverview> {
    constructor(
      public request: VehicleOverviewsRequest,
      public recordsCount: number,
      public overviews: VehicleOverview[]) {
      super(request, recordsCount, overviews);
    }
}
