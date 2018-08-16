import { IProcessServiceToken, IProcessService } from './../../services/process/i-process-service';
import { OnInit, Inject } from '@angular/core';
import { IStatisticsService } from './../../services/statistics/i-statistics-service';
import { BaseComponent } from '../common/base.component';
import { Statistics } from '../../models/statistics/statistics';

export class StatisticsComponent
    <TRequest, TData, TService extends IStatisticsService<TRequest, TData>>
    extends BaseComponent implements OnInit {

    protected request: TRequest;
    protected statistics: Statistics<TRequest, TData>;

    constructor(
        @Inject(IProcessServiceToken) protected processService: IProcessService,
        protected statisticsService: IStatisticsService<TRequest, TData>
    ) {
        super(processService);
        this.request = <TRequest>new Object();
    }

    public ngOnInit(): void {
        this.init();
    }

    protected init(onComplete?: (statistics: Statistics<TRequest, TData>) => void): void {
        this.statisticsService.getStatistics(this.request)
            .exec(statistics => {
                this.statistics = statistics;
                if (onComplete) {
                    onComplete(statistics);
                }
            });
    }
}
