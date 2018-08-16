import { forkJoin } from 'rxjs/observable/forkJoin';
import { Task } from './../../../../common/tasks/task';
import { EmptyListRequest } from './../../../../common/models/lists/empty-list-request';
import { IVehicleModelsListServiceToken, IVehicleModelsListService } from './../../../services/models/lists/i-vehicle-models-list-service';
import { IMakersListService } from './../../../services/makers/lists/i-makers-list-service';
import { IFeaturesListService } from './../../../services/features/lists/i-features-list-service';
import { VehicleModelsListRequest } from './../../../models/models/lists/vehicle-models-list-request';
import { ModelsList } from './../../../../common/models/lists/models-list';
import { NoRequestModelsList } from './../../../../common/models/lists/no-request-models-list';
import { IProcessServiceToken, IProcessService } from './../../../../common/services/process/i-process-service';
import { VehicleOverviewsRequest } from './../../../models/vehicles/overviews/vehicle-overviews-request';
import { Component, OnInit, Inject } from '@angular/core';
import { OverviewsFilter } from '../../../../common/components/overviews/overviews-filter.component';
import { IFeaturesListServiceToken } from '../../../services/features/lists/i-features-list-service';
import { IMakersListServiceToken } from '../../../services/makers/lists/i-makers-list-service';


@Component({
  selector: 'app-vehicles-filter',
  templateUrl: './vehicles-filter.component.html',
  styles: []
})
export class VehiclesFilterComponent
  extends OverviewsFilter<VehicleOverviewsRequest> implements OnInit {

  private makersList: NoRequestModelsList;
  private modelsList: ModelsList<VehicleModelsListRequest>;
  private featuresList: NoRequestModelsList;

  constructor(
    @Inject(IProcessServiceToken) protected processService: IProcessService,
    @Inject(IFeaturesListServiceToken) private featuresService: IFeaturesListService,
    @Inject(IMakersListServiceToken) private makersService: IMakersListService,
    @Inject(IVehicleModelsListServiceToken) private modelsService: IVehicleModelsListService) {
    super(processService);
   }

  public ngOnInit(): void {
    const makersModelsRequest = this.makersService.getList(new EmptyListRequest())
    .asObservable()
    .flatMap(makersList => {
        this.makersList = makersList;
        return this.modelsService.getList(
          new VehicleModelsListRequest(makersList.items.map(i => +i.value)))
          .asObservable();
      }
    );

    const featuresRequest = this.featuresService.getList(new EmptyListRequest())
                                                .asObservable();

    Task.create(forkJoin([makersModelsRequest, featuresRequest]))
      .exec(
      ([modelsList, featuresList]: [ModelsList<VehicleModelsListRequest>, NoRequestModelsList]) => {
        this.modelsList = modelsList;
        this.featuresList = featuresList;
      });
  }

  protected onClearFilter(): void {
    this.updateModels([], (modelsList) => {
      super.onClearFilter();
    });
  }

  private onChangeMakers(makers: number[]): void {
    this.updateModels(makers);
  }

  private updateModels(
    makers: number[],
    onUpdated?: (modelsList: ModelsList<VehicleModelsListRequest>) => void)
    : void {
    this.modelsService.getList(new VehicleModelsListRequest(makers))
    .exec(modelsList => {
        this.modelsList = modelsList;
        if (onUpdated) {
        onUpdated(modelsList);
        }
    });
  }
}
