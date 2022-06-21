import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import { RoomIdDialogComponent } from '../dialog/roomid.dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  name!: string;
  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {}

  joinRoom() {
    const dialogRef = this.dialog.open(RoomIdDialogComponent, {
      width: '250px',
      data: { name: this.name },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.router.navigate(['/room', result]);
    });
  }
}
