import axios, { Method } from "axios";
import querystring from "querystring";
import convert from "xml-js";
import { parseData } from "./parser";
import { StorageFC } from "./storage";
import { v4 as uuidv4 } from "uuid";
import { chatService } from "../store/services/services";

export class GameClient {
  private client: Client;
  private static instance: GameClient;
  private commands: string[];
  private tick: number = 0;
  private tock: number = 0;

  private constructor(client: Client, commands?: string[]) {
    this.client = client;
    this.commands = commands || [];
    chatService.lastMessId.subscribe((val: number) => this.setLastMessId(val.toString()))
    const lc = StorageFC.getStorage("LocalStorage");
    let deviceId = lc.getItem("deviceId");
    if (!deviceId) {
      deviceId = uuidv4();
      lc.setItem("deviceId", deviceId);
      this.setDeviceId(deviceId);
    } else {
      this.setDeviceId(deviceId);
    }
  }

  public static getInstance(client: Client, commands?: string[]): GameClient {
    if (!GameClient.instance)
      GameClient.instance = new GameClient(client, commands);

    return GameClient.instance;
  }

  public startInterval() {
    setInterval(() => {
      try {
        this.sendCommand();
      } catch (e) {
        throw new Error("send error");
      }
    }, 1100);
  }

  public pushCommand(comm: string): void {
    setTimeout(() => {});
    this.commands.push(comm);
  }

  public getNextCommand() {
    return this.commands.shift();
  }

  public setLastMessId(lastMessId: string): void {
    this.client.setParams({ lc: lastMessId });
  }

  private setDeviceId(deviceId: string) {
    this.client.setParams({ i: deviceId });
  }


  private async sendCommand() {
    this.tick++;

    const elem = this.getNextCommand();
    try {
      if (elem) {
        this.tick = 0;
        const res = await this.client.sendCommand(elem);
        parseData(res);
      } else {
        if (this.tock < 16) {
          if (this.tick > 4) {
            this.tick = 0;
            this.tock++;
            const res = await this.client.sendCommand("000");
            parseData(res);
          }
        } else {
          this.tock = 0;
          const res = await this.client.sendCommand("getcomms");
          parseData(res);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}

abstract class Client {
  abstract sendCommand(comm: string): any;
  abstract setParams(...args: any[]): void;
}

type PostParams = {
  i: string;
  v: string;
  lc: string;
};

class HttpClient extends Client {
  private url: string;
  private proxy_url: string;
  private params: PostParams;
  private method: Method;

  constructor(
    url: string,
    proxy_url: string,
    params: PostParams,
    method: Method = "POST"
  ) {
    super();
    this.url = url;
    this.proxy_url = proxy_url;
    this.params = params;
    this.method = method;
  }

  public setParams(params: PostParams) {
    this.params = { ...this.params, ...params };
  }

  async sendCommand(comm: string) {
    try {      
      const response = await axios.request({
        url: this.proxy_url + this.url,
        method: this.method,
        data: querystring.stringify({
          ...this.params,
          j: comm
        }),
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });

      return convert.xml2js(response.data, {
        compact: true,
        elementNameFn: function (val) {
          return val.charAt(0).toLowerCase() + val.slice(1);
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export const gameClient = GameClient.getInstance(
  new HttpClient(
    "https://sofsw.jabbergames.ru/g.php",
    "",
    {
      i: "0",
      v: "a.1.0.8.7",
      lc: "0",
    },
    "POST"
  ),
  [
    "getmappoints",
    "getcomms",
    "0",
    "chatmess !chroom? descr",
    "chatmess !history",
    "chatmess !chroom? list",
  ]
);
