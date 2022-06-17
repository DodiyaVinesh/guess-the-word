import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'roomid-dialog',
  templateUrl: 'roomid.dialog.component.html',
})
export class RoomIdDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<RoomIdDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { roomId: string },
    private fb: FormBuilder
  ) {}
  roomForm = this.fb.group({
    code: ['', Validators.required],
  });
}
