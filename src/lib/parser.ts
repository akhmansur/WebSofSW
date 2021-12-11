import { Point } from "../store/services/GameService";
import {
  chatService,
  gameService,
  progressService,
  settingsService,
} from "../store/services/services";
import { commandsService } from "../store/services/services";
import { mapService } from "../store/services/services";

export function parseData(data: any) {
  const keys = Object.keys(data.resp);
  if (!keys) return;
  for (const res of keys) {
    switch (res) {
      case "commands":
        parseCommands(data.resp.commands?.comm);
        break;
      case "settings":
        parseSettings(data.resp.settings);
        break;
      case "mess":
        parseMess(data.resp?.mess);
        break;
      case "perdata":
        parsePerdata(
          Array.isArray(data.resp?.perdata)
            ? data.resp.perdata[0]
            : data.resp.perdata
        );
        break;
      default:
        break;
    }
  }
  return;
}

function parsePerdata(res: any): void {
  progressService.setProgress({
    hp: {
      des: res.php?._attributes?.hpdes,
      current: res.php?._attributes?.hp,
      max: res.php?._attributes?.hpmax,
    },
    sp: {
      des: res.psp?._attributes?.spdes,
      current: res.psp?._attributes?.sp,
      max: res.psp?._attributes?.spmax,
    },
    pt: {
      des: res.ppt?._attributes?.ptdes,
      current: res.ppt?._attributes?.pt,
      max: res.ppt?._attributes?.ptmax,
    },
  });
  progressService.setGenInfo({
    atten: res.atten?._attributes?.on,
    emoji: res.emoji?._text,
    plev: {
      ldes: res.plev?._attributes?.ldes,
      lev: parseInt(res.plev?._attributes?.lev),
    },
    pname: res.pname?._text,
  });
}

function parseCommands(comm: any): void {
  if (!Array.isArray(comm)) comm = [comm];
  comm = comm.map((el: any) => {
    return { ctxt: el.ctxt._text, kay: el.kay._text };
  });
  commandsService.setCommands(comm);
}

function parseSettings(settings: any): void {
  if (settings) {
    settingsService.setSettings({
      push_chmes: settings.push_chmes._text,
      push_prmes: settings.push_prmes._text,
      push_rdy: settings.push_rdy._text,
      theme: settings.theme._text.toLowerCase(),
    });
  }
}

function parseMess(mess: any): void {
  if (Array.isArray(mess)) {
    mess.forEach((el) => {
      if (el._attributes?.type === "chatroomdes")
        chatService.setRoomDes({
          des: el.des?._text,
          incount: parseInt(el.incount?._text),
          name: el.name?._text,
        });
    });
    mess.forEach((el) => parseMessItem(el));
  } else {
    parseMessItem(mess);
  }
}

function parseMessItem(messItem: any): void {
  if (!messItem._attributes) return;
  switch (messItem._attributes?.type) {
    case "mappoints":
      let mapC: string[] = [];
      let mapP: string[] = [];
      messItem.mpt.forEach((el: any) => {
        mapC.push(el._attributes?.x + ":" + el._attributes?.y);
        mapP.push(el._attributes?.c);
      });
      mapService.setMappoints(mapC, mapP);
      break;
    case "game":
      let commands = [];
      if (Array.isArray(messItem.comm)) {
        commands = messItem.comm.map((el: any) => {
          return { ctxt: el.ctxt._text, kay: el.kay._text };
        });
      } else {
        commands.push({
          ctxt: messItem.comm.ctxt._text,
          kay: messItem.comm.kay._text,
        });
      }
      if (!Array.isArray(messItem.text))
        gameService.setInfo({
          comm: commands,
          text: [messItem.text._text],
          lynk: null,
        });
      else {
        let lynk;
        gameService.setInfo({
          comm: commands,
          text: messItem.text.map((el: any) => {
            if (el.lynk) {
              lynk = el.lynk._attributes;
            }
            return el.text ? el.text._text + el._text : el._text;
          }),
          lynk: lynk ? lynk : null,
        });
      }
      const point: Point = {
        x: parseInt(messItem.point?._attributes?.x),
        y: parseInt(messItem.point?._attributes?.y),
        c: messItem.point?._attributes?.code,
      };
      gameService.setPoint(point);
      mapService.setPoint(point);
      break;
    case "chatroomdes":
      chatService.setRoomDes({
        des: messItem.des?._text,
        incount: parseInt(messItem.incount?._text),
        name: messItem.name?._text,
      });
      break;
    case "chatrooms":
      let rooms = messItem.chatroom?.map((el: any) => ({
        des: el.des?._text,
        incount: parseInt(el.incount?._text),
        name: el.name?._text,
        num: parseInt(el.num?._text),
      }));
      chatService.setRoomsList(rooms);
      break;
    case "chat":
      if(!messItem.mtext?._text) break;
      if (!messItem._attributes.totop)
        chatService.setMessages({
          dtime: messItem.dtime?._text,
          from: messItem.from?._text,
          mid: parseInt(messItem.mid?._text),
          mtext: messItem.mtext?._text,
        });
      else
        chatService.setHistoryMessages({
          dtime: messItem.dtime?._text,
          from: messItem.from?._text,
          mid: parseInt(messItem.mid?._text),
          mtext: messItem.mtext?._text,
        });
      if(chatService.lastMessId.get() < messItem.mid?._text)
        chatService.lastMessId.set(parseInt(messItem.mid?._text))
      break;
    default:
      break;
  }
}
