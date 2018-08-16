import { IAlertsServiceToken } from './../../services/alerts/ialerts.service';
import { Alert } from './../../models/alerts/alert-model';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { IAlertsService } from '../../services/alerts/ialerts.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styles: []
})
export class AlertsComponent implements OnInit, OnDestroy {
  private alerts: Array<Alert> = [];
  private alertsSubscription: Subscription;

  constructor(@Inject(IAlertsServiceToken) private alertsService: IAlertsService) { }

  ngOnInit() {
    this.alertsSubscription = this.alertsService.onAlert.subscribe(alert => {
      this.alerts.push(alert);
    });
  }

  public closeAlert(i: number): void {
    this.alerts.splice(i, 1);
  }

  ngOnDestroy() {
    this.alertsSubscription.unsubscribe();
  }
}
