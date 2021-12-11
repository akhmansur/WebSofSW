import { isArraysEqual } from "../../lib/utils";
import { Observable } from "../observable/Observable";
import { Point } from "./GameService";

export class MapService {
  readonly mapC = new Observable<string[]>([]);
  readonly mapP = new Observable<string[]>([]);

  setMappoints(mapC: string[], mapP: string[]): void {
    if(!isArraysEqual(this.mapC, mapC) || !isArraysEqual(this.mapP, mapP))
      this.mapP.set(mapP);
      this.mapC.set(mapC);
  }

  setPoint(point: Point) {
    if(this.mapC.get().indexOf(point.x + ':' + point.y) < 0) {
      this.mapC.set(this.mapC.get().concat([point.x + ':' + point.y]))
      this.mapP.set(this.mapP.get().concat([point.c]))
    }
  }
}
