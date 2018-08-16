import { Alert } from './../../models/alerts/alert-model';
import { EventEmitter, InjectionToken } from '@angular/core';

export interface IAlertsService {

  onAlert: EventEmitter<Alert>;

  info(message: string): void;

  warning(message: string): void;

  error(message: string): void;
}

export const IAlertsServiceToken = new InjectionToken<IAlertsService>('IAlertsService');

