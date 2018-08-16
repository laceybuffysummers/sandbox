import { InjectionToken } from '@angular/core';

export interface IConfirmService {
    confirm(onConfirm: (confirmed: boolean) => void);
}

export const IConfirmServiceToken = new InjectionToken<IConfirmService>('IConfirmService');
