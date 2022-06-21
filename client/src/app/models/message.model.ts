import { User } from './user.model';

export interface Message {
  content: string;
  timestamp: number;
  sender: User;
  isMine?: boolean;
}
