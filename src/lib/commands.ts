import { gameClient } from "./clients";

abstract class Command {
  abstract Execute(...args: any[]): void;
}


export class MacroCommand extends Command {
  private commands: Command[] = [];

  Execute() {
    this.commands.forEach((command: Command) => command.Execute());
  }

  appendCommand(command: Command) {
    this.commands.push(command);
  }

  removeCommand(command: Command) {
    this.commands = this.commands.filter((comm) => comm !== command);
  }
}


export class GetMapCommand extends Command {
  Execute() {
    GetMapCommand.Execute();
  }

  static Execute() {
    gameClient.pushCommand("getmappoints");
  }
}


export class SendChatmessCommand extends Command {
  private chatmess: string | null = null;
  constructor(chatmess?: string) {
    //to support MacroCommand creation
    super();
    if (chatmess) this.chatmess = chatmess;
  }

  Execute() {
    if (this.chatmess) gameClient.pushCommand(this.chatmess);
    else return;
  }

  static Execute(
    chatmess: string,
    reciever: string = "",
    isPrivate: boolean = false
  ) {
    if (reciever && !isPrivate) return;
    else
      gameClient.pushCommand(
        (isPrivate ? "!private " : "") + "chatmess " + reciever + " " + chatmess
      );
  }
}


export class SimpleCommand extends Command {
  private comm: string | null = null;
  constructor(comm?: string) {
    //to support MacroCommand creation
    super();
    if (comm) this.comm = comm;
  }

  Execute() {
    if (this.comm) gameClient.pushCommand(this.comm);
    else return;
  }

  static Execute(command: string) {
    gameClient.pushCommand(command);
  }
}


export class RoomDescrCommand extends Command {
  Execute() {
    RoomDescrCommand.Execute();
  }

  static Execute() {
    gameClient.pushCommand("chatmess !chroom? descr");
  }
}


export class RoomListCommand extends Command {
  Execute() {
    RoomListCommand.Execute();
  }

  static Execute() {
    gameClient.pushCommand("chatmess !chroom? list");
  }
}


export class RoommatesListCommand extends Command {
  Execute() {
    RoommatesListCommand.Execute();
  }

  static Execute() {
    gameClient.pushCommand("chatmess !chroom? ulist");
  }
}


export class ChangeRoomCommand extends Command {
  private roomId: string | null = null;
  constructor(roomId?: string) {
    //to support MacroCommand creation
    super();
    if (roomId) this.roomId = roomId;
  }

  Execute() {
    if (this.roomId) gameClient.pushCommand('chatmess !chroom! ' + this.roomId);
    else return;
  }

  static Execute(roomId: string | null) {
    if (!roomId) return;
    else gameClient.pushCommand('chatmess !chroom! ' + roomId);
  }
}


export class GetCommandsCommand extends Command {
  Execute() {
    GetCommandsCommand.Execute();
  }

  static Execute() {
    gameClient.pushCommand("getcomms");
  }
}


export class PrevChatMessgsCommand extends Command {
  static lastMessId = '0';

  Execute(messId: string) {
    gameClient.pushCommand("chatmess !history " + messId);
  }

  static Execute(messId: string) {
    if(PrevChatMessgsCommand.lastMessId !== messId){
      gameClient.pushCommand("chatmess !history " + messId);
      PrevChatMessgsCommand.lastMessId = messId;
    }
    else return;
  }
}


type MoveSides = {
  [key: string] : string
}

export class MoveCommands extends Command {
  static sides: MoveSides = {
    'north': 'n',
    'west': 'w',
    'south': 's',
    'east': 'e',
  };

  static Execute(side: string) {
    gameClient.pushCommand(this.sides[side]);
  }

  Execute(side: string) {
    MoveCommands.Execute(side)
  }
}
