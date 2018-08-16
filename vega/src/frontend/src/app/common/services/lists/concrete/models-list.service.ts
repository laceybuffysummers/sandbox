import { HttpTask } from './../../../tasks/http-task';
import { UrlUtils } from './../../../utils/url.utils';
import { ModelsList } from './../../../models/lists/models-list';
import { IModelsListService } from './../i-models-list-service';
import { Injectable } from '@angular/core';
import { Task } from '../../../tasks/task';

@Injectable()
export abstract class ModelsListService<TRequest> implements IModelsListService<TRequest> {

  protected abstract getBaseUrl(): string;

  public getList(request?: TRequest): Task<ModelsList<TRequest>> {
    return HttpTask.create(`${this.getBaseUrl()}?${UrlUtils.ToQueryString(request)}`)
          .get();
  }
}
