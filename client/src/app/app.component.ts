import { Component, Inject, OnInit } from '@angular/core';
import { NameDialogComponent } from './components/dialog/name.dialog.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name!: string;
  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {
    this.name = localStorage.getItem('name') || '';

    if (this.name) {
      return;
    }
    const dialogRef = this.dialog.open(NameDialogComponent, {
      width: '250px',
      data: { name: this.name },
    });

    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe((result) => {
      localStorage.setItem('name', result);
    });
  }
}
