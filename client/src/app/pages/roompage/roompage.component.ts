import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-roompage',
  templateUrl: './roompage.component.html',
  styleUrls: ['./roompage.component.css'],
})
export class RoompageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private socket: SocketService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {});
  }
}
