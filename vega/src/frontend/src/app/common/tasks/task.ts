import { ServiceLocator } from './../infrastructure/service-locator';
import { IConfirmService } from './../services/confirm/i-confirm.service';
import { Inject } from '@angular/core';
import { IProcessServiceToken, IProcessService } from './../services/process/i-process-service';
import { Observable } from 'rxjs/Observable';
import { IConfirmServiceToken } from '../services/confirm/i-confirm.service';

export class Task<T> {
    constructor(
        protected observable: any,
        @Inject(IProcessServiceToken) protected processService: IProcessService,
        @Inject(IConfirmServiceToken) protected confirmService: IConfirmService
    ) {
    }

    public static create<T>(observable: Observable<T>): Task<T> {
        const task = new Task<T>(
                        observable,
                        ServiceLocator.injector.get(IProcessServiceToken),
                        ServiceLocator.injector.get(IConfirmServiceToken));
        return task;
    }

    public asObservable(): Observable<T> {
        return this.observable;
    }

    public confirm(
        onSuccess?: (result: T) => void,
        onError?: (error: any) => void,
        onComplete?: () => void
    ) {
        this.confirmService.confirm((confirmed: boolean) => {
            if (confirmed) {
                this.exec(onSuccess, onError, onComplete);
            }
        });
    }

    public exec(
        onSuccess?: (result: T) => void,
        onError?: (error: any) => void,
        onComplete?: () => void
    ): void {
        this.processService.show();
        const subscription = this.observable.subscribe(
            onSuccess,
            (error: any) => {
                if (subscription) {
                    subscription.unsubscribe();
                }
                this.processService.hide();
                if (onError) {
                    onError(error);
                }
                throw error;
            },
            () => {
                subscription.unsubscribe();
                this.processService.hide();
                if (onComplete) {
                    onComplete();
                }
            }
        );
    }
}
