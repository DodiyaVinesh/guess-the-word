import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.css'],
})
export class CreatePageComponent implements OnInit {
  constructor(
    private socket: SocketService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  life = '3';
  timer = '10';

  ngOnInit(): void {}
  createRoom() {
    this.socket
      .createRoom({
        life: parseInt(this.life),
        timer: parseInt(this.timer),
      })
      .then((res) => {
        this.snackBar.open(res.msg);
        this.router.navigate(['/room', res.data.roomId]);
      })
      .catch((err) => {
        console.log(err);
        this.snackBar.open('Something went wrong.');
      });
  }
}
