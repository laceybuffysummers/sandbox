import { InjectionToken } from '@angular/core';
import { VehicleModelsListRequest } from './../../../models/models/lists/vehicle-models-list-request';
import { IModelsListService } from '../../../../common/services/lists/i-models-list-service';

// tslint:disable-next-line:no-empty-interface
export interface IVehicleModelsListService extends IModelsListService<VehicleModelsListRequest> {
}

export const IVehicleModelsListServiceToken = new InjectionToken<IVehicleModelsListService>('IVehicleModelsListService');

