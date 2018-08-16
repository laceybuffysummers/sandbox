import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-mat-confirm',
  templateUrl: './mat-confirm.component.html',
  styles: []
})
export class MatConfirmComponent {
  constructor(
    public dialogRef: MatDialogRef<MatConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
}
