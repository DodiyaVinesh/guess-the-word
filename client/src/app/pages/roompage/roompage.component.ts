import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-roompage',
  templateUrl: './roompage.component.html',
  styleUrls: ['./roompage.component.css'],
})
export class RoompageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private socket: SocketService,
    private snackBar: MatSnackBar
  ) {}
  roomData: any;
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.socket
        .getRoomData(params['id'])
        .then((data) => {
          this.roomData = data;
          console.log(this.roomData);
        })
        .catch((err) => {
          this.router.navigate(['/']);
          this.snackBar.open(err);
        });
    });
  }
}
