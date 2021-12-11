import { LocalStorage } from "../../lib/storage";
import { Observable } from "../observable/Observable";

interface Settings {
  push_chmes: number,
  push_prmes: number,
  push_rdy: number,
  theme: string
}

export class SettingsService {
  readonly settings = new Observable<Settings>({
    push_chmes: 0,
    push_prmes: 0,
    push_rdy: 0,
    theme: LocalStorage.getInstance().getItem('currentTheme') || 'light'
  });

  setSettings(settings: Settings): void {
    if(JSON.stringify(this.settings.get()) !== JSON.stringify(settings)) {
      this.settings.set(settings)
    }
  }
}