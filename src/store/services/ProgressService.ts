import { Observable } from "../observable/Observable";


export interface MainCharacter {
  readonly des: string,
  readonly current: number,
  readonly max: number
}

interface Progress {
  readonly hp: MainCharacter,
  readonly sp: MainCharacter,
  readonly pt: MainCharacter,
}

interface Level {
  readonly ldes: string,
  readonly lev: number
}

export interface GeneralInfo {
  readonly atten: string,
  readonly emoji: string,
  readonly plev: Level,
  readonly pname: string
}

export class ProgressService {
  readonly pb = new Observable<Progress>({
    hp: {
      des: '',
      current: 0,
      max: 0
    },
    sp: {
      des: '',
      current: 0,
      max: 0
    },
    pt: {
      des: '',
      current: 0,
      max: 0
    },    
  });

  readonly genCharInfo = new Observable<GeneralInfo>({
    atten: '',
    emoji: '',
    plev: {
      ldes: 'y:',
      lev: 0
    },
    pname: ''
  })

  setProgress(progress: Progress): void {
    if(JSON.stringify(this.pb.get()) !== JSON.stringify(progress)) {
      this.pb.set(progress)
    }
  }

  setGenInfo(genInfo: GeneralInfo): void {
    if(JSON.stringify(this.genCharInfo.get()) !== JSON.stringify(genInfo)) {
      this.genCharInfo.set(genInfo)
    }
  }
}