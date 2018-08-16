import { IProcessServiceToken, IProcessService } from './../../services/process/i-process-service';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, Inject, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProcessComponent implements OnInit, OnDestroy {

  private show: boolean;
  private subscription: Subscription;

  constructor(
    @Inject(IProcessServiceToken) private processService: IProcessService,
    private ref: ChangeDetectorRef) { }

  public ngOnInit() {
    this.subscription = this.processService.process.subscribe(show => {
        this.show = show;
        this.ref.detectChanges();
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
