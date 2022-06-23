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
  constructor(private socket: SocketService) {}

  round = '10';
  timer = '10';

  ngOnInit(): void {}
  createRoom() {
    this.socket.createRoom({
      round: parseInt(this.round),
      timer: parseInt(this.timer),
    });
  }
}
