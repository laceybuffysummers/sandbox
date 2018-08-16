import { IOwnersListService, IOwnersListServiceToken } from './services/owners/lists/i-owners-list-service';
import { VehiclesStatisticsService } from './services/vehicles/statistics/concrete/vehicles-statistics.service';
import { IVehiclesStatisticsServiceToken } from './services/vehicles/statistics/i-vehicles-statistics-service';
import { IVehicleModelsListServiceToken } from './services/models/lists/i-vehicle-models-list-service';
import { IMakersListServiceToken } from './services/makers/lists/i-makers-list-service';
import { IFeaturesListServiceToken } from './services/features/lists/i-features-list-service';
import { IVehiclesCrudServiceToken } from './services/vehicles/entity/i-vehicles-crud-service';
import { IVehicleOverviewsServiceToken } from './services/vehicles/ovewviews/i-vehicle-overviews-service';
import { VehicleModelsListService } from './services/models/lists/concrete/vehicle-models-list.service';
import { MakersListService } from './services/makers/lists/concrete/makers-list.service';
import { FeaturesListService } from './services/features/lists/concrete/features-list.service';
import { Component } from '@angular/core';
import { VehicleOverviewsService } from './services/vehicles/ovewviews/concrete/vehicle-overviews.service';
import { VehiclesCrudService } from './services/vehicles/entity/concrete/vehicle-crud.service';
import { OwnersListService } from './services/owners/lists/concrete/owners-list.service';

@Component({
  selector: 'app-vega',
  templateUrl: './vega.component.html',
  styleUrls: ['./vega.component.css'],
  providers: [
    { provide: IVehicleOverviewsServiceToken, useClass: VehicleOverviewsService },
    { provide: IVehiclesCrudServiceToken, useClass: VehiclesCrudService },
    { provide: IFeaturesListServiceToken, useClass: FeaturesListService },
    { provide: IMakersListServiceToken, useClass: MakersListService },
    { provide: IVehicleModelsListServiceToken, useClass: VehicleModelsListService },
    { provide: IVehiclesStatisticsServiceToken, useClass: VehiclesStatisticsService },
    { provide: IOwnersListServiceToken, useClass: OwnersListService }
  ]
})
export class VegaComponent {
}
