import { InjectionToken } from '@angular/core';
import { IOverviewsService } from '../../../../common/services/overviews/i-overviews.service';
import { VehicleOverviewsRequest } from '../../../models/vehicles/overviews/vehicle-overviews-request';
import { VehicleOverviews } from '../../../models/vehicles/overviews/vehicle-overviews';

// tslint:disable-next-line:no-empty-interface
export interface IVehicleOverviewsService
    extends IOverviewsService<VehicleOverviewsRequest, VehicleOverviews> {
}

export const IVehicleOverviewsServiceToken = new InjectionToken<IVehicleOverviewsService>('IVehicleOverviewsService');

