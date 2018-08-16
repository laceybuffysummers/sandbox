import { HttpTask } from './../../../tasks/http-task';
import { Task } from './../../../tasks/task';
import { Injectable } from '@angular/core';
import { IStatisticsService } from '../i-statistics-service';
import { Statistics } from '../../../models/statistics/statistics';
import { UrlUtils } from '../../../utils/url.utils';

@Injectable()
export abstract class StatisticsService<TRequest, TData>
  implements IStatisticsService<TRequest, TData> {

  protected abstract getBaseUrl(): string;

  public getStatistics(request?: TRequest): Task<Statistics<TRequest, TData>> {
    return HttpTask.create(
      `${this.getBaseUrl()}?${UrlUtils.ToQueryString(request)}`)
      .get();
  }
}

