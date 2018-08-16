import { Observable } from 'rxjs/Observable';
import { InjectionToken } from '@angular/core';
export interface IProcessService {
    process: Observable<boolean>;

    show(): void;

    hide(): void;
}

export const IProcessServiceToken = new InjectionToken<IProcessService>('IProcessService');
