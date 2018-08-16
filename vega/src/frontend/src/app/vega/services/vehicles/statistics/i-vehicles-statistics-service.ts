import { InjectionToken } from '@angular/core';
import { VehiclesByMakerData } from './../../../models/vehicles/statistics/vehicles-by-maker-data';
import { INoRequestStatisticsService } from './../../../../common/services/statistics/i-no-request-statistics-service';

// tslint:disable-next-line:no-empty-interface
export interface IVehiclesStatisticsService
    extends INoRequestStatisticsService<VehiclesByMakerData> {
}

export const IVehiclesStatisticsServiceToken = new InjectionToken<IVehiclesStatisticsService>('IVehiclesStatisticsService');
