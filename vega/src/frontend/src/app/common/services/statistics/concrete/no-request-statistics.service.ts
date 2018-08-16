import { EmptyStatisticsRequest } from './../../../models/statistics/empty-statistics-request';
import { Injectable } from '@angular/core';
import { StatisticsService } from './statistics.service';

@Injectable()
export abstract class NoRequestStatisticsService<TData>
  extends StatisticsService<EmptyStatisticsRequest, TData> {
}
