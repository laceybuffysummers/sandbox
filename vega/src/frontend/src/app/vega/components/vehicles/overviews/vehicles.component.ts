import { IVehicleOverviewsServiceToken } from './../../../services/vehicles/ovewviews/i-vehicle-overviews-service';
import { Component, Inject } from '@angular/core';
import { MatTableOverviewsComponent } from '../../../../common/components/overviews/mat-table-overviews.component';
import { IVehicleOverviewsService } from '../../../services/vehicles/ovewviews/i-vehicle-overviews-service';
import { VehicleOverviewsRequest } from '../../../models/vehicles/overviews/vehicle-overviews-request';
import { VehicleOverviews } from '../../../models/vehicles/overviews/vehicle-overviews';
import { VehicleOverview } from '../../../models/vehicles/overviews/vehicle-overview';
import { IProcessServiceToken, IProcessService } from '../../../../common/services/process/i-process-service';
import { IConfigServiceToken, IConfigService } from '../../../../common/services/config/i-config-service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styles: []
})
export class VehiclesComponent
  extends MatTableOverviewsComponent<IVehicleOverviewsService,
                                      VehicleOverviewsRequest,
                                      VehicleOverviews,
                                      VehicleOverview> {

    private displayedColumns = ['maker', 'model', 'contact', 'actions'];

    constructor(
        @Inject(IProcessServiceToken) protected processService: IProcessService,
        @Inject(IVehicleOverviewsServiceToken) protected overviewsService: IVehicleOverviewsService,
        @Inject(IConfigServiceToken) private configService: IConfigService) {
        super(
          processService,
          overviewsService,
          configService.getPageSize());
    }
}
