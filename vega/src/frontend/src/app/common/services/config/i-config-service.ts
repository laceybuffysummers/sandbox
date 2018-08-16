import { InjectionToken } from '@angular/core';
export interface IConfigService {
    getApiBaseUrl(): string;

    getPageSize(): number;
}

export const IConfigServiceToken = new InjectionToken<IConfigService>('IConfigService');

