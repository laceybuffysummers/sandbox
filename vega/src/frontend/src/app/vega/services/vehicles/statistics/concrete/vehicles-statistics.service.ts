import { IVehiclesStatisticsService } from './../i-vehicles-statistics-service';
import { VehiclesByMakerData } from './../../../../models/vehicles/statistics/vehicles-by-maker-data';
import { Injectable, Inject } from '@angular/core';
import { NoRequestStatisticsService } from '../../../../../common/services/statistics/concrete/no-request-statistics.service';
import { IConfigServiceToken, IConfigService } from '../../../../../common/services/config/i-config-service';

@Injectable()
export class VehiclesStatisticsService
  extends NoRequestStatisticsService<VehiclesByMakerData>
  implements IVehiclesStatisticsService {
    constructor (
      @Inject(IConfigServiceToken) private configService: IConfigService) {
      super();
    }

    protected getBaseUrl(): string {
        return this.configService.getApiBaseUrl() + 'vehicles/statistics/bymakers';
    }
}
