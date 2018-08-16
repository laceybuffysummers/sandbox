import { HttpCodes } from './../constants/http-codes';
import { IProcessServiceToken, IProcessService } from './../services/process/i-process-service';
import { IAlertsServiceToken, IAlertsService } from './../services/alerts/ialerts.service';
import { ErrorHandler, Inject, NgZone, Injectable } from '@angular/core';

@Injectable()
export class AppErrorHandler implements ErrorHandler {
    constructor(
        @Inject(IAlertsServiceToken) protected alertsService: IAlertsService,
        @Inject(IProcessServiceToken) protected processService: IProcessService,
        @Inject(NgZone) private ngZone: NgZone) {
    }

    handleError(err: any): void {
        this.ngZone.run(() => {
            this.processService.hide();

            const errors = this.getErrors(err);
            for (const error of errors) {
                this.alertsService.error(error);
            }
        });
    }

    private getErrors(err: any): string[] {
        const errors = [];

        if (err.status !== HttpCodes.BAD_REQUEST) {
            errors.push(err.message);
            console.error(err);
            return errors;
        }

        if (Array.isArray(err.error)) {
            for (const error of err.error){
                errors.push(JSON.stringify(error));
            }
            return errors;
        }

        if (err.error) {
            errors.push(JSON.stringify(err.error));
            return errors;
        }

        errors.push(err.message);
        return errors;
    }
}
