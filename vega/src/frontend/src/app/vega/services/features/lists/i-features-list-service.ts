import { InjectionToken } from '@angular/core';
import { INoRequestListService } from '../../../../common/services/lists/i-no-request-list-service';

// tslint:disable-next-line:no-empty-interface
export interface IFeaturesListService extends INoRequestListService {
}

export const IFeaturesListServiceToken = new InjectionToken<IFeaturesListService>('IFeaturesListService');
