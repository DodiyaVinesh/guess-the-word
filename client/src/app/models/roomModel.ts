export interface Room {
  id: string;
  owner?: string;
  config: RoomConfig;
  readyCount: number;
  isRunning: boolean;
  currentWord: string | null;
  users?: string[];
}

export interface RoomConfig {
  round: number;
  timer: number;
}
