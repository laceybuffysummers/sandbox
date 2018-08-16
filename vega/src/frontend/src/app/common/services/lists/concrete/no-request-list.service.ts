import { Injectable } from '@angular/core';
import { ModelsListService } from './models-list.service';
import { EmptyListRequest } from '../../../models/lists/empty-list-request';

@Injectable()
export abstract class NoRequestListService
  extends ModelsListService<EmptyListRequest> {
}
