import { User } from './user.model';

export interface RoomConfig {
  life: number;
  timer: number;
  users?: User[];
  owner?: User;
}
