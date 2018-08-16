import { MatConfirmComponent } from './../../../components/confirm/mat-confirm/mat-confirm.component';
import { IConfirmService } from './../i-confirm.service';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class MatConfirmService
    implements IConfirmService {
    constructor(
        private dialog: MatDialog) {}

    confirm(onConfirm: (confirmed: boolean) => void) {
        const dialogRef = this.dialog.open(MatConfirmComponent, {
            width: '250px',
            data: { }
          });

        const subscription = dialogRef.afterClosed().subscribe(confirmed => {
            subscription.unsubscribe();
            onConfirm(confirmed);
        });
    }
}
