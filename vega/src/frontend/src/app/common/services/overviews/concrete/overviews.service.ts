import { HttpTask } from './../../../tasks/http-task';
import { Task } from './../../../tasks/task';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { UrlUtils } from './../../../utils/url.utils';
import { IOverviewsService } from '../i-overviews.service';

@Injectable()
export abstract class OverviewsService<TOverviewsRequest, TOverviews>
  implements IOverviewsService<TOverviewsRequest, TOverviews> {

    protected abstract getBaseUrl(): string;

    public getOverviews(request: TOverviewsRequest): Task<TOverviews> {
      return HttpTask.create(
        `${this.getBaseUrl()}/overviews?${UrlUtils.ToQueryString(request)}`)
        .get();
    }
}
