import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { IProcessServiceToken, IProcessService } from './../../services/process/i-process-service';
import { OnInit, Inject, ViewChild, AfterViewInit } from '@angular/core';
import { OverviewsComponent } from './overviews.component';
import { MatSort } from '@angular/material/sort';
import { IOverviewsService } from '../../services/overviews/i-overviews.service';
import { OverviewsRequest } from '../../models/overviews/overviews-request';
import { Overviews } from '../../models/overviews/overviews';

export abstract class MatTableOverviewsComponent
    <TOverviewsService extends IOverviewsService<TOverviewsRequest, TOverviews>,
        TOverviewsRequest extends OverviewsRequest,
        TOverviews extends Overviews<TOverviewsRequest, TOverview>,
        TOverview>
    extends OverviewsComponent<TOverviewsService, TOverviewsRequest, TOverviews, TOverview>
    implements OnInit, AfterViewInit {

    private dataSource;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        @Inject(IProcessServiceToken) protected processService: IProcessService,
        protected overviewsService: TOverviewsService,
        protected pageSize: number) {
        super(processService, overviewsService, pageSize);
    }

    public ngAfterViewInit() {
      if (this.dataSource) {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    }

    protected onOverviewsUpdated(overviews: TOverviews) {
      this.dataSource = new MatTableDataSource(overviews.overviews);
    }

    private onPageChange(event: PageEvent): void {
      this.request.pageSize = event.pageSize;
      this.request.pageNumber = event.pageIndex + 1;
      this.updateOverviews();
    }

    private onSortChange(event: any) {
      this.request.sortBy = event.active;
      this.request.desc = event.direction === 'desc';
      this.updateOverviews();
    }
}
