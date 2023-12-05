import { ChatHeirarchy } from "./chat.entity";

export interface CreateChatRoomI {
  name: string;
  roomOwner: string;
}
export interface AddUserToChatRoomI {
  roomId: string;
  serviceUser: string;
}
export interface ChatEntityI {
  type: string;
  message: string;
  chatRoom: string;
  sender: string;
  s3Path: string;
  parent?: string | null;
}
export interface JoinRoomI {
  id: string[];
  name: string;
  roomOwner: string;
  isActive: number;
}
export interface JoinRoomResponseI {
  name: string;
  chatRoomId?: string;
  roomOwner: string;
  initMessage?: string;
  users: string[];
  chatMessages?: ChatHeirarchy[];
}
