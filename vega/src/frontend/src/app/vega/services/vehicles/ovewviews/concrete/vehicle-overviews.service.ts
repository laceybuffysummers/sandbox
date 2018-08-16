import { IVehicleOverviewsService } from './../i-vehicle-overviews-service';
import { Injectable, Inject } from '@angular/core';
import { OverviewsService } from '../../../../../common/services/overviews/concrete/overviews.service';
import { VehicleOverviewsRequest } from '../../../../models/vehicles/overviews/vehicle-overviews-request';
import { VehicleOverviews } from '../../../../models/vehicles/overviews/vehicle-overviews';
import { IConfigServiceToken, IConfigService } from '../../../../../common/services/config/i-config-service';

@Injectable()
export class VehicleOverviewsService
        extends OverviewsService<VehicleOverviewsRequest, VehicleOverviews>
        implements IVehicleOverviewsService {
      constructor (
        @Inject(IConfigServiceToken) private configService: IConfigService) {
        super();
      }

      protected getBaseUrl(): string {
          return this.configService.getApiBaseUrl() + 'vehicles';
      }
  }
