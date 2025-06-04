export interface BlockedUser {
  id: number;
  blockerId: number;
  blockedId: number;
  createdAt: Date;
}