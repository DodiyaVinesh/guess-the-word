import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Response } from 'src/app/models/response.model';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  joinForm!: FormGroup;
  constructor(
    private socket: SocketService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.joinForm = new FormGroup({
      code: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}
  joinRoom() {
    this.socket.joinRoom(this.joinForm.value.code).then((res) => {
      if (res.code == 'JOINED_ROOM') {
        this.router.navigate(['/room', res.data.roomId]);
      }
      this.snackBar.open(res.msg);
    });
  }
  createRoom() {
    this.socket.createRoom().then((res) => {
      this.snackBar.open(res.msg);
      this.router.navigate(['/room', res.data.roomId]);
    });
  }
}
