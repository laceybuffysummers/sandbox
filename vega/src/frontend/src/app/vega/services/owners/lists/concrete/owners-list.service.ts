import { IOwnersListService } from './../i-owners-list-service';
import { Injectable, Inject } from '@angular/core';
import { NoRequestListService } from '../../../../../common/services/lists/concrete/no-request-list.service';
import { IConfigServiceToken, IConfigService } from '../../../../../common/services/config/i-config-service';

@Injectable()
export class OwnersListService
  extends NoRequestListService
  implements IOwnersListService {

    constructor(
      @Inject(IConfigServiceToken) private configService: IConfigService) {
      super();
    }

    protected getBaseUrl(): string {
      return this.configService.getApiBaseUrl() + 'owners/list';
    }

}
