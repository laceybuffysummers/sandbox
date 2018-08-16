import { IVehicleModelsListService } from './../i-vehicle-models-list-service';
import { VehicleModelsListRequest } from './../../../../models/models/lists/vehicle-models-list-request';
import { Injectable, Inject } from '@angular/core';
import { ModelsListService } from '../../../../../common/services/lists/concrete/models-list.service';
import { IConfigServiceToken, IConfigService } from '../../../../../common/services/config/i-config-service';

@Injectable()
export class VehicleModelsListService
  extends ModelsListService<VehicleModelsListRequest>
  implements IVehicleModelsListService {

  constructor(
    @Inject(IConfigServiceToken) private configService: IConfigService) {
    super();
  }

  protected getBaseUrl(): string {
    return this.configService.getApiBaseUrl() + 'models/list';
  }

}
