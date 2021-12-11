import { Observable } from "../observable/Observable";

export interface Room {
  des: string;
  incount: number;
  name: string;
  num?: number
}

export interface ChatMessage {
  dtime: string,
  from: string,
  mid: number,
  mtext: string
}

export class ChatService {
  readonly roomDes = new Observable<Room>({
    des: '',
    incount: 0,
    name: '',
  });
  readonly rooms= new Observable<Room[]>([]);
  readonly messages = new Observable<ChatMessage[]>([])
  readonly lastMessId = new Observable<number>(0);

  setRoomDes(roomDes: Room): void {
    if(roomDes.name !== this.roomDes.get().name) {
      this.messages.set([])
      this.lastMessId.set(0)
    }
    this.roomDes.set(roomDes);
  }

  setMessages(message: ChatMessage):void {
    this.messages.set([...this.messages.get(),message])
  }

  setHistoryMessages(message: ChatMessage):void {
    this.messages.set([message, ...this.messages.get()])
  }

  setRoomsList(rooms: Room[]): void {
    if(rooms.length !== 0)
      this.rooms.set(rooms)
  }
}
