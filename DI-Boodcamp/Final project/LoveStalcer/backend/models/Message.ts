export interface Message {
  id?: number;
  senderId: number;       // ID отправителя
  receiverId: number;     // ID получателя
  content: string;        // Содержимое сообщения
  timestamp: Date;        // Время отправки
}