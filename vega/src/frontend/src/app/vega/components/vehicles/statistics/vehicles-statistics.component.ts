import { IVehiclesStatisticsServiceToken } from './../../../services/vehicles/statistics/i-vehicles-statistics-service';
import { IProcessService } from './../../../../common/services/process/i-process-service';
import { StatisticsComponent } from './../../../../common/components/statistics/statistics-component';
import { Component, OnInit, Inject } from '@angular/core';
import { EmptyStatisticsRequest } from '../../../../common/models/statistics/empty-statistics-request';
import { VehiclesByMakerData } from '../../../models/vehicles/statistics/vehicles-by-maker-data';
import { IProcessServiceToken } from '../../../../common/services/process/i-process-service';
import { IVehiclesStatisticsService } from '../../../services/vehicles/statistics/i-vehicles-statistics-service';

@Component({
  selector: 'app-vehicles-statistics',
  templateUrl: './vehicles-statistics.component.html',
  styles: []
})
export class VehiclesStatisticsComponent
  extends StatisticsComponent<EmptyStatisticsRequest,
                              VehiclesByMakerData,
                              IVehiclesStatisticsService>
  implements OnInit {

  private labels: string[];
  private data: number[];
  private chartType = 'doughnut';

  constructor(
    @Inject(IProcessServiceToken) protected processService: IProcessService,
    @Inject(IVehiclesStatisticsServiceToken) protected statisticsService: IVehiclesStatisticsService
  ) {
    super(processService, statisticsService);
 }

  public ngOnInit(): void {
    this.init(statistics => {
      this.labels = statistics.items.map(i => i.label);
      this.data = statistics.items.map(i => i.data.vehiclesNumber);
    });
  }

  private chartClicked(e: any): void {
    console.log(e);
  }

  private chartHovered(e: any): void {
    console.log(e);
  }
}
