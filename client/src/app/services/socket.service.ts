import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Response } from '../models/response.model';
import { RoomConfig } from '../models/roomConfig.model';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket!: io.Socket<DefaultEventsMap, DefaultEventsMap>;
  roomData: any;
  constructor() {
    this.socket = io.connect('http://localhost:3000');
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
    return new Promise((resolve: (res: Response) => void, reject) => {
      this.socket.emit('getRoomData', roomId, (res: Response) => {
        if (res.code == 'JOINED_ROOM') {
          this.roomData = res.data.room;
          resolve(this.roomData);
        } else {
          reject(res.msg);
        }
      });
      setTimeout(() => {
        reject('Time out, Something went wrong.');
      }, 10000);
    });
  }
}
