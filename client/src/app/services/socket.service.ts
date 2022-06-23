import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import * as io from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Message } from '../models/message.model';
import { Response } from '../models/response.model';
import { Room, RoomConfig } from '../models/roomModel';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket!: io.Socket<DefaultEventsMap, DefaultEventsMap>;
  roomData = new BehaviorSubject<Room | null>(null);
  messages: BehaviorSubject<Message[]> = new BehaviorSubject([] as Message[]);
  amIReady = new BehaviorSubject(false);
  showTimer = new BehaviorSubject(false);

  constructor(private snackBar: MatSnackBar, private router: Router) {
    this.socket = io.connect('http://localhost:3000');

    this.socket.on('updateRoom', (newData) => {
      newData.users = newData.users.map((user: User) => {
        if (user.id == this.socket.id) {
          this.amIReady.next(user.isReady);
        }
        if (user.id == newData.owner) {
          return { ...user, isOwner: true };
        }
        return user;
      });
      this.roomData.next(newData);
    });

    this.socket.on('message', (msg) => {
      if (this.socket.id == msg.sender.id) {
        msg.isMine = true;
      }
      let newMsgs = this.messages.getValue();
      newMsgs.push(msg);
      this.messages.next(newMsgs);
    });

    this.socket.on('starting', () => {
      this.showTimer.next(true);
      setTimeout(() => {
        this.showTimer.next(false);
      }, 5000);
    });
  }

  clearSocket() {
    if (this.socket) {
      this.socket.off('updateRoom');
      this.socket.off('message');
    }
  }

  createRoom(config: RoomConfig) {
    this.socket.emit('create', config, (res: Response) => {
      this.snackBar.open(res.msg);
      this.router.navigate(['/room', res.data.id]);
    });
  }

  joinRoom(roomId: string) {
    this.socket.emit('join', roomId, (res: Response) => {
      if (res.code == 'JOINED_ROOM') {
        this.messages.next([]);
      } else {
        this.snackBar.open(res.msg);
      }
    });
  }

  updateProfile({ username }: { username: string }) {
    this.socket.emit('updateProfile', { username });
  }

  sendMessage(content: string) {
    this.socket.emit('message', { content });
  }

  toogleReady() {
    if (this.amIReady.value) {
      this.socket.emit('notReady');
    } else {
      this.socket.emit('ready');
    }
  }

  sendAnswer(answer: string) {
    console.log(answer);
    // if (!this.roomData.value?.isRunning) return;
    this.socket.emit('answer', answer, (res: Response) => {
      if (res.code == 'RIGHT_ANSWER') {
        console.log('correct');
      } else {
        console.log('wrong');
      }
    });
  }
}
