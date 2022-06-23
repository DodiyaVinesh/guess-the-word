export interface User {
  id: string;
  username: string;
  currentRoom: string | null;
  isOwner: boolean;
  isReady: boolean;
  score: number;
}
