import { IFeaturesListService } from './../i-features-list-service';
import { Injectable, Inject } from '@angular/core';
import { NoRequestListService } from '../../../../../common/services/lists/concrete/no-request-list.service';
import { IConfigServiceToken, IConfigService } from '../../../../../common/services/config/i-config-service';

@Injectable()
export class FeaturesListService
  extends NoRequestListService
  implements IFeaturesListService {

  constructor(
    @Inject(IConfigServiceToken) private configService: IConfigService) {
    super();
  }

  protected getBaseUrl(): string {
    return this.configService.getApiBaseUrl() + 'features/list';
  }
}
