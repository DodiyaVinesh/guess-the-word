import {
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
export class RoompageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private socket: SocketService) {}
  @ViewChild('msgs') msgsEl!: ElementRef;
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

  sendMessage() {
    let content = this.messageForm.value.message;
    this.messageForm.setValue({ message: '' });
    this.socket.sendMessage(content);
  }

  toogleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
