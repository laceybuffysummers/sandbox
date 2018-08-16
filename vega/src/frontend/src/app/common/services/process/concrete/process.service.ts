import { Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { IProcessService } from './../i-process-service';

@Injectable()
export class ProcessService implements IProcessService {
    private processObserver: Observer<boolean>;
    public process: Observable<boolean>;

    constructor() {
        this.process = new Observable<boolean>(observer => {
                this.processObserver = observer;
            }
        ).share();
    }

    show(): void {
        if (this.processObserver) {
            this.processObserver.next(true);
        }
    }

    hide(): void {
        if (this.processObserver) {
            this.processObserver.next(false);
        }
    }
}
