import { IProcessServiceToken, IProcessService } from './../../services/process/i-process-service';
import { EventEmitter, Output, Input, Inject } from '@angular/core';
import { OverviewsRequest } from '../../models/overviews/overviews-request';
import { BaseComponent } from '../common/base.component';

export abstract class OverviewsFilter <TOverviewsRequest extends OverviewsRequest>
    extends BaseComponent {

    @Input()
    public request: TOverviewsRequest;

    @Output()
    public filter: EventEmitter<TOverviewsRequest> = new EventEmitter<TOverviewsRequest>();

    constructor(
        @Inject(IProcessServiceToken) protected processService: IProcessService) {
        super(processService);
    }

    protected onFilter(): void {
        this.filter.emit(this.request);
    }

    protected onClearFilter(): void {
        this.request = <TOverviewsRequest>new OverviewsRequest(
                                            this.request.sortBy,
                                            this.request.desc,
                                            this.request.pageSize,
                                            this.request.pageNumber);
        this.filter.emit(this.request);
    }
}
