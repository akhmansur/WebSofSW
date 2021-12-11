import { Observable } from "../observable/Observable";

export class SwipeService {
  readonly active = new Observable<number>(0);
  readonly backdropActive = new Observable<boolean>(false);

  setActive(active: number): void {
    if(this.active.get() !== active) {
      this.active.set(active)
    }
  }

  toggleBackdropActive() {
    this.backdropActive.set(!this.backdropActive.get())
  }
}