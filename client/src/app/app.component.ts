import { Component, Inject, OnInit } from '@angular/core';
import { NameDialogComponent } from './components/dialog/name.dialog.component';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { SocketService } from './services/socket.service';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  username!: string;
  constructor(public dialog: MatDialog, private socket: SocketService) {}
  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';

    if (this.username) {
      this.socket.updateProfile({ username: this.username });
      return;
    }
    const dialogRef = this.dialog.open(NameDialogComponent, {
      width: '250px',
      data: { username: this.username },
    });

    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe((result) => {
      this.socket.updateProfile({ username: result });
      localStorage.setItem('username', result);
    });
  }
}
