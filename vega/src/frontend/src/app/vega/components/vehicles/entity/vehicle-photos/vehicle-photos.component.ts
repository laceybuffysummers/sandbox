import { Component, OnInit, Inject, Input } from '@angular/core';
import { BaseComponent } from '../../../../../common/components/common/base.component';
import { IProcessServiceToken, IProcessService } from '../../../../../common/services/process/i-process-service';
import { VehiclePhoto } from '../../../../models/vehicles/entity/vehicle-photo';
import { UrlUtils } from '../../../../../common/utils/url.utils';

@Component({
  selector: 'app-vehicle-photos',
  templateUrl: './vehicle-photos.component.html',
  styles: []
})
export class VehiclePhotosComponent
  extends BaseComponent implements OnInit {

  @Input()
  public photos: VehiclePhoto[];

  constructor(
    @Inject(IProcessServiceToken) protected processService: IProcessService
  ) {
    super(processService);
  }

  public ngOnInit(): void {
  }

  private getDownloadUrl(photo: VehiclePhoto) {
    return `files/${UrlUtils.ToQueryString(photo)}`;
  }
}

