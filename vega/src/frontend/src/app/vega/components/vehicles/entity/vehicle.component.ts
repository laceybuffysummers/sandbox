import { BindItem } from './../../../../common/models/files/bind-item';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Task } from './../../../../common/tasks/task';
import { VehicleModelsListRequest } from './../../../models/models/lists/vehicle-models-list-request';
import { ModelsList } from './../../../../common/models/lists/models-list';
import { NoRequestModelsList } from './../../../../common/models/lists/no-request-models-list';
import { EmptyListRequest } from './../../../../common/models/lists/empty-list-request';
import { IVehicleModelsListServiceToken, IVehicleModelsListService } from './../../../services/models/lists/i-vehicle-models-list-service';
import { IMakersListServiceToken, IMakersListService } from './../../../services/makers/lists/i-makers-list-service';
import { IFeaturesListService } from './../../../services/features/lists/i-features-list-service';
import { IVehiclesCrudServiceToken } from './../../../services/vehicles/entity/i-vehicles-crud-service';
import { IAlertsService } from './../../../../common/services/alerts/ialerts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProcessServiceToken, IProcessService } from './../../../../common/services/process/i-process-service';
import { Vehicle } from './../../../models/vehicles/entity/vehicle';
import { Component, OnInit, Inject } from '@angular/core';
import { NumberIdCrudComponent } from '../../../../common/components/entity/number-id-crud-component';
import { IVehiclesCrudService } from '../../../services/vehicles/entity/i-vehicles-crud-service';
import { IAlertsServiceToken } from '../../../../common/services/alerts/ialerts.service';
import { IFeaturesListServiceToken } from '../../../services/features/lists/i-features-list-service';
import { IOwnersListServiceToken, IOwnersListService } from '../../../services/owners/lists/i-owners-list-service';
import { UploadedFiles } from '../../../../common/models/files/uploaded-files';
import { IConfigServiceToken, IConfigService } from '../../../../common/services/config/i-config-service';
import { IEntityFilesServiceToken, IEntityFilesService } from '../../../../common/services/files/i-entity-files.service';
import { BindToEntity } from '../../../../common/models/files/bind-to-entity';
import { BindedToEntity } from '../../../../common/models/files/binded-to-entity';
import { VehiclePhoto } from '../../../models/vehicles/entity/vehicle-photo';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styles: []
})
export class VehicleComponent
  extends NumberIdCrudComponent<IVehiclesCrudService, Vehicle> implements OnInit {

  private makersList: NoRequestModelsList;
  private modelsList: ModelsList<VehicleModelsListRequest>;
  private ownersList: NoRequestModelsList;

  constructor(
    @Inject(IProcessServiceToken) protected processService: IProcessService,
    @Inject(IVehiclesCrudServiceToken) protected vehiclesCrudService: IVehiclesCrudService,
    protected route: ActivatedRoute,
    private router: Router,
    @Inject(IAlertsServiceToken) private alertsService: IAlertsService,
    @Inject(IFeaturesListServiceToken) private featuresService: IFeaturesListService,
    @Inject(IMakersListServiceToken) private makersService: IMakersListService,
    @Inject(IVehicleModelsListServiceToken) private modelsService: IVehicleModelsListService,
    @Inject(IOwnersListServiceToken) private ownersService: IOwnersListService,
    @Inject(IConfigServiceToken) private configService: IConfigService,
    @Inject(IEntityFilesServiceToken) private filesService: IEntityFilesService) {
    super(processService, vehiclesCrudService, route);
  }

  public ngOnInit(): void {
    this.init(model => {
        const makersModelsRequest = this.makersService.getList(new EmptyListRequest())
        .asObservable()
        .flatMap(makersList => {
            this.makersList = makersList;
            return this.modelsService.getList(
              new VehicleModelsListRequest(
                this.isNew ?
                makersList.items.map(i => +i.value) :
                [this.model.makerId]))
              .asObservable();
          }
        );

        const ownersRequest = this.ownersService.getList(new EmptyListRequest())
                                                .asObservable();

        Task.create(forkJoin([makersModelsRequest, ownersRequest]))
          .exec(
          ([modelsList, ownersList]: [ModelsList<VehicleModelsListRequest>, NoRequestModelsList]) => {
            this.modelsList = modelsList;
            this.ownersList = ownersList;
          });
      });
  }

  private onChangeMaker(maker: number): void {
    this.model.modelId = null;
    this.updateModels([maker]);
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

  private onSave(): void {
    this.save(model => {
      const bindToEntity: BindToEntity = new BindedToEntity(
        'vehicles',
        model.id.toString(),
        this.model.photos
          .filter(p => p.isNew)
          .map(p => new BindItem(p.fileName))
      );
      this.filesService.bind(bindToEntity).exec((bindedToEntity: BindedToEntity) => {
        console.log(bindedToEntity);
      });

      this.alertsService.info('Vehicle saved.');
      if (this.isNew) {
        this.router.navigate(['/vehicles', model.id]);
      }
    });
  }

  private onDelete(): void {
    this.delete(model => {
      this.alertsService.info('Vehicle deleted.');
      this.router.navigate(['/vehicles']);
    });
  }

  private get uploadUrl(): string {
    return `${this.configService.getApiBaseUrl()}files/upload`;
  }

  private onUploaded(uploadedFiles: UploadedFiles): void {
    for (const uploadedFile of uploadedFiles.items) {
      const photo = new VehiclePhoto(
          '',
          uploadedFile.fileName,
          uploadedFile.originalFileName,
          uploadedFile.mimeType,
          this.model.id);
      this.model.photos.push(photo);
    }
  }
}

