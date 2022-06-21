import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/app.component';

@Component({
  selector: 'name-dialog',
  templateUrl: 'name.dialog.component.html',
})
export class NameDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<NameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { username: string }
  ) {}
}
