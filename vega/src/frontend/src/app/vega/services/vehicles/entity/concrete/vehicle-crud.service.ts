import { IVehiclesCrudService } from './../i-vehicles-crud-service';
import { Injectable, Inject } from '@angular/core';
import { NumberIdCrudService } from '../../../../../common/services/entity/concrete/number-id-crud.service';
import { Vehicle } from '../../../../models/vehicles/entity/vehicle';
import { IConfigServiceToken, IConfigService } from '../../../../../common/services/config/i-config-service';

@Injectable()
export class VehiclesCrudService
        extends NumberIdCrudService<Vehicle>
        implements IVehiclesCrudService {
      constructor (
        @Inject(IConfigServiceToken) private configService: IConfigService) {
        super();
      }

      protected getBaseUrl(): string {
          return this.configService.getApiBaseUrl() + 'vehicles';
      }
  }
