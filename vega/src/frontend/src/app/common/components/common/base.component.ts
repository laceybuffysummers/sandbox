import { IProcessServiceToken, IProcessService } from './../../services/process/i-process-service';
import { Inject } from '@angular/core';

export abstract class BaseComponent {
  private busy: boolean;

  constructor(
      @Inject(IProcessServiceToken) protected processService: IProcessService) { }

  protected get isBusy(): boolean {
    return this.busy;
  }

  protected set isBusy(busy: boolean) {
     this.busy = busy;
     if (busy) {
       this.processService.show();
     } else {
       this.processService.hide();
     }
  }

  protected compareListItems(i1, i2): boolean {
    return +i1 === +i2;
  }
}
