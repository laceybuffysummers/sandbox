import { Component, OnInit } from '@angular/core';
import { OverviewComponent } from '../../../../common/components/overviews/overview.component';
import { VehicleOverview } from '../../../models/vehicles/overviews/vehicle-overview';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-vehicle-overview]',
  templateUrl: './vehicle-overview.component.html',
  styles: []
})
export class VehicleOverviewComponent extends OverviewComponent<VehicleOverview> implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
