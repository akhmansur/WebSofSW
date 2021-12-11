import { Observable } from "../observable/Observable";
import { Command } from "./CommandsService";

export type Point = {
  x: number;
  y: number;
  c: string;
};

type GameInfo = {
  comm: Command[];
  text: string[];
  lynk: { a: string; text: string } | null;
};

export class GameService {
  readonly MAX_LOG_MESSGS = 100;
  readonly gameInfo = new Observable<GameInfo>({
    comm: [],
    text: [],
    lynk: null
  });

  readonly point = new Observable<Point>({
    x: 0,
    y: 0,
    c: "",
  });

  readonly textLog = new Observable<string[]>([]);

  setInfo(gameInfo: GameInfo): void {
    if (JSON.stringify(this.gameInfo) !== JSON.stringify(gameInfo)) {
      this.gameInfo.set(gameInfo);
    }
    this.addToLog(gameInfo.text);
  }

  setPoint(point: Point): void {
    if (JSON.stringify(this.point) !== JSON.stringify(point))
      this.point.set(point);
  }

  addToLog(mess: string[]): void {
    if (this.textLog.get().length < this.MAX_LOG_MESSGS) {
      this.textLog.set([...this.textLog.get(), ...mess]);
    } else this.textLog.set([]);
  }

  getTextLog(): string[] {
    return this.textLog.get();
  }
}
