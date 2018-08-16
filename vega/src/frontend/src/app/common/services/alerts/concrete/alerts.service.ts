import { Injectable, EventEmitter } from '@angular/core';
import { IAlertsService } from './../ialerts.service';
import { Alert } from '../../../models/alerts/alert-model';

export class AlertsService implements IAlertsService {

  public onAlert = new EventEmitter<Alert>();

  public info(message: string): void {
    this.onAlert.emit(new Alert(message, 'info', true));
  }

  public warning(message: string): void {
    this.onAlert.emit(new Alert(message, 'warning', true));
  }

  public error(message: string): void {
    this.onAlert.emit(new Alert(message, 'danger', true));
  }
}
