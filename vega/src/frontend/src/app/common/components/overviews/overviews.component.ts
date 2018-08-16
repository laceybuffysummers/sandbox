import { IProcessServiceToken, IProcessService } from './../../services/process/i-process-service';
import { Inject, OnInit } from '@angular/core';
import { IOverviewsService } from '../../services/overviews/i-overviews.service';
import { OverviewsRequest } from '../../models/overviews/overviews-request';
import { Overviews } from '../../models/overviews/overviews';
import { BaseComponent } from '../common/base.component';
import { Task } from '../../tasks/task';

export abstract class OverviewsComponent
  <TOverviewsService extends IOverviewsService<TOverviewsRequest, TOverviews>,
    TOverviewsRequest extends OverviewsRequest,
    TOverviews extends Overviews<TOverviewsRequest, TOverview>,
    TOverview>
  extends BaseComponent implements OnInit {

  protected request: TOverviewsRequest;

  protected overviews: TOverviews;

  constructor(
      @Inject(IProcessServiceToken) protected processService: IProcessService,
      protected overviewsService: TOverviewsService,
      protected pageSize: number) {
      super(processService);
      this.request = <TOverviewsRequest> new OverviewsRequest('', false, pageSize, 1);
  }

  public ngOnInit(): void {
    this.updateOverviews();
  }

  protected abstract onOverviewsUpdated(overviews: TOverviews);

  protected updateOverviews(): void {
    this.overviewsService.getOverviews(this.request)
          .exec(overviews => {
              this.overviews = overviews;
              this.onOverviewsUpdated(overviews);
          });
  }

  protected onFilter(request: TOverviewsRequest) {
    this.request = request;
    this.updateOverviews();
  }
}
