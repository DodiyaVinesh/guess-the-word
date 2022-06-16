import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket!: io.Socket<DefaultEventsMap, DefaultEventsMap>;
  roomData: any;
  constructor() {
    this.socket = io.connect('http://localhost:3000');
  }

  joinRoom(roomId: string) {
    return new Promise((resolve: (res: Response) => void, reject) => {
      this.socket.emit('join', roomId, (res: Response) => {
        resolve(res);
      });
    });
  }
  createRoom() {
    return new Promise((resolve: (res: Response) => void, reject) => {
      this.socket.emit('create', (res: Response) => {
        resolve(res);
      });
    });
  }

  getRoomData() {
    this.socket.emit('get-room-data', (res: Response) => {
      if (res.code == 'SUCCESS') {
        this.roomData = res.data.roomData;
      }
    });
  }
}
