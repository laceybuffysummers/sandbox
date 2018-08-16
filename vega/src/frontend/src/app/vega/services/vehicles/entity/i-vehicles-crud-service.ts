import { InjectionToken } from '@angular/core';
import { INumberIdCrudService } from '../../../../common/services/entity/i-number-id-crud.service';
import { Vehicle } from '../../../models/vehicles/entity/vehicle';

// tslint:disable-next-line:no-empty-interface
export interface IVehiclesCrudService extends INumberIdCrudService<Vehicle> {
}

export const IVehiclesCrudServiceToken = new InjectionToken<IVehiclesCrudService>('IVehiclesCrudService');



