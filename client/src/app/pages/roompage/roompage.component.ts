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
import { Response } from 'src/app/models/response.model';
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
  @ViewChild('countdown') countdownEl!: ElementRef;
  roomData: any;
  messages!: Message[];
  amIReady = false;

  isSidebarOpen = true;
  selectedSidebar = 1;

  messageForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });
  answerForm = new FormGroup({
    answer: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.socket.joinRoom(params['id']);
    });

    this.socket.amIReady.subscribe((ready) => {
      this.amIReady = ready;
    });

    this.socket.showTimer.subscribe((show) => {
      if (!this.countdownEl) return;
      if (show) {
        this.countdownEl.nativeElement.classList.add('show');
        let childs = this.countdownEl.nativeElement.children;
        for (let i = 0; i <= childs.length; i++) {
          setTimeout(() => {
            childs[i - 1]?.classList.remove('visible');
            childs[i]?.classList.add('visible');
          }, i * 1000);
        }
      } else {
        this.countdownEl.nativeElement.classList.remove('show');
      }
    });

    this.socket.roomData.subscribe((roomData) => {
      this.roomData = roomData;
      this.circlePlayer();
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

  ngOnDestroy(): void {}

  ngAfterViewInit(): void {}

  sendMessage() {
    let content = this.messageForm.value.message;
    this.messageForm.setValue({ message: '' });
    this.socket.sendMessage(content);
  }

  toogleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toogleReady() {
    this.socket.toogleReady();
  }
  sendAnswer() {
    this.socket
      .sendAnswer(this.answerForm.value.answer)
      .then(() => {
        this.answerForm.reset();
      })
      .catch(() => {
        this.answerForm.reset();
      });
  }

  circlePlayer() {
    setTimeout(() => {
      let players = this.playersEl.nativeElement.children;
      var increase = (Math.PI * 2) / players.length;
      var x = 0,
        y = 0,
        angle = 0;
      for (var i = 0; i < players.length; i++) {
        x = 27 * Math.cos(angle);
        let isXnagative = x < 0;
        y = 27 * Math.sin(angle);
        let isYnagative = y < 0;
        players[i].style.left = isXnagative
          ? 'max(' + x + 'vh,' + x + 'vw)'
          : 'min(' + x + 'vh,' + x + 'vw)';
        players[i].style.top = isYnagative
          ? 'max(' + y + 'vh,' + y + 'vw)'
          : 'min(' + y + 'vh,' + y + 'vw)';
        angle += increase;
      }
    }, 50);
  }
}
