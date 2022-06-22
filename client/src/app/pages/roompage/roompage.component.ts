import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/models/message.model';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-roompage',
  templateUrl: './roompage.component.html',
  styleUrls: ['./roompage.component.css'],
})
export class RoompageComponent implements OnInit, OnDestroy {
  constructor(private route: ActivatedRoute, private socket: SocketService) {}
  @ViewChild('msgs') msgsEl!: ElementRef;
  @ViewChild('players') playersEl!: ElementRef;
  roomData: any;
  messages!: Message[];

  isSidebarOpen = true;
  selectedSidebar = 1;

  messageForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.socket.getRoomData(params['id']);
    });

    this.socket.roomData.subscribe((roomData) => {
      this.roomData = roomData;
      setTimeout(() => {
        let players = this.playersEl.nativeElement.children;
        var increase = (Math.PI * 2) / players.length;
        var x = 0,
          y = 0,
          angle = 0;
        for (var i = 0; i < players.length; i++) {
          x = 100 * Math.cos(angle);
          y = 100 * Math.sin(angle);
          players[i].style.left = x + 'px';
          players[i].style.top = y + 'px';
          angle += increase;
        }
      }, 50);
    });
    this.socket.messages.subscribe((messages) => {
      this.messages = messages;
      if (!this.msgsEl) return;
      setTimeout(() => {
        this.msgsEl.nativeElement.scrollTop =
          this.msgsEl.nativeElement.scrollHeight;
      }, 50);
    });
  }

  ngOnDestroy(): void {
    this.socket.clearSocket();
  }

  ngAfterViewInit(): void {}

  sendMessage() {
    let content = this.messageForm.value.message;
    this.messageForm.setValue({ message: '' });
    this.socket.sendMessage(content);
  }

  toogleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
