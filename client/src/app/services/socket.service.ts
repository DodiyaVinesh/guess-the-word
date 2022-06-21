import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import * as io from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Message } from '../models/message.model';
import { Response } from '../models/response.model';
import { RoomConfig } from '../models/roomConfig.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket!: io.Socket<DefaultEventsMap, DefaultEventsMap>;
  roomData: BehaviorSubject<any> = new BehaviorSubject(null);
  messages: BehaviorSubject<Message[]> = new BehaviorSubject([] as Message[]);

  constructor(private snackBar: MatSnackBar) {
    this.socket = io.connect('http://localhost:3000');

    // listeners
    this.socket.on('userJoin', (user) => {
      let newData = this.roomData.getValue();
      newData.users.push(user);
      this.roomData.next(newData);
    });

    this.socket.on('userLeave', (userId) => {
      let newData = this.roomData.getValue();
      newData.users = newData.users.filter((user: User) => user.id != userId);
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
  }

  createRoom(config: RoomConfig) {
    return new Promise((resolve: (res: Response) => void, reject) => {
      this.socket.emit('create', config, (res: Response) => {
        resolve(res);
      });
      setTimeout(() => {
        reject('Time out, Something went wrong.');
      }, 10000);
    });
  }

  getRoomData(roomId: string) {
    this.socket.emit('getRoomData', { roomId }, (res: Response) => {
      if (res.code == 'JOINED_ROOM') {
        this.messages.next([]);
        this.roomData.next(res.data.room);
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
}
