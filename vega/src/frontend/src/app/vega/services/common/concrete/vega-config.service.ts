import { environment } from './../../../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { IConfigService } from '../../../../common/services/config/i-config-service';

@Injectable()
export class VegaConfigService implements IConfigService {

  getApiBaseUrl(): string {
    return environment.API_BASE_URL;
  }

  getPageSize(): number {
    return environment.PAGE_SIZE;
  }

}
