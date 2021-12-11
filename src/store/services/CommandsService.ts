import { Observable } from "../observable/Observable";

export interface Command {
  ctxt: string;
  kay: string;
}

export class CommandsService {
  readonly commands = new Observable<Command[]>([]);

  setCommands(commands: Command[]): void {
    this.commands.set(commands);
  }
}
