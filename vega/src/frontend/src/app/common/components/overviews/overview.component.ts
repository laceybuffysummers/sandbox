import { Input } from '@angular/core';

export abstract class OverviewComponent<TOverview> {

  @Input() public overview: TOverview;
}
