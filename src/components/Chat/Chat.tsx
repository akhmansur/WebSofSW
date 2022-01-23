import React from 'react';
import { convertIndentsToHTML, convertUnicode } from '../../lib/utils';
import { ChatMessage, Room } from '../../store/services/ChatService';
import { chatService, progressService } from '../../store/services/services';
import { Dropdown } from './Dropdown/Dropdown';
import './Chat.scss';
import { ChangeRoomCommand, PrevChatMessgsCommand, RoomDescrCommand, RoomListCommand, RoommatesListCommand, SendChatmessCommand, SimpleCommand } from '../../lib/commands';

type DropdownState = {
  isPrivate: boolean;
  nickname: string | null;
  isShown: boolean;
};

type DropdownPos = {
  top: number | null;
  right: number | null;
};

interface IChatState {
  menuPos: DropdownPos;
  menuState: DropdownState;
  chat: {
    $roomDes: Room;
    $rooms: Room[];
    $messages: ChatMessage[];
  };
  nick: string | null;
  input: string;
}

const initialState = {
  menuPos: {
    top: 0,
    right: 0,
  },
  menuState: {
    isPrivate: false,
    nickname: null,
    isShown: false,
  },
  chat: {
    $roomDes: chatService.roomDes.get(),
    $messages: chatService.messages.get(),
    $rooms: chatService.rooms.get(),
  },
  nick: null,
  input: '',
};

export class Chat extends React.Component {
  private subs: { (): void }[] = [];
  chatminid: number = 2147483647;
  state: IChatState = initialState;
  menuCbs: { (): void }[] = [];

  constructor(props: any) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.setState({
      chat: {
        $roomDes: chatService.roomDes.get(),
        $messages: chatService.messages.get(),
        $rooms: chatService.rooms.get(),
      },
    });
    this.subs = [
      chatService.roomDes.subscribe((val) => this.updateState('$roomDes', val)),
      chatService.rooms.subscribe((val) => this.updateState('$rooms', val)),
      chatService.messages.subscribe((val) =>
        this.updateState('$messages', val)
      ),
    ];
  }

  componentWillUnmount() {
    this.subs.map((el: {(): void}) => el());
    this.subs = [];
  }


  updateState(name: string, getter: Room | Room[] | ChatMessage[]): void {
    this.setState({ chat: { ...this.state.chat, [name]: getter } });
  }

  getMenuCallback(
    params?: [boolean, string | null, boolean],
    command?: string | null
  ) {
    return () => {
      if (params)
        this.setState({
          menuState: {
            isPrivate: params[0],
            nickname: params[1],
            isShown: params[2],
          },
        });
      if (command) SimpleCommand.Execute(command);
    };
  }

  render() {
    const pname = progressService.genCharInfo.get().pname;
    this.menuCbs = [
      this.getMenuCallback([false, this.state.nick, false]),
      this.getMenuCallback([true, this.state.nick, false]),
      this.getMenuCallback(
        [this.state.menuState.isPrivate, this.state.menuState.nickname, false],
        '05 ' + this.state.nick
      ),
      () => RoommatesListCommand.Execute(),
      this.getMenuCallback([false, null, false]),
    ];

    return (
      <div className='chat'>
        <section>
          <div
            className='chat-room-name'
            onClick={() => RoomListCommand.Execute()}
          >
            <div>
              {this.state.chat.$roomDes.name + ' в комнате: ' +
                this.state.chat.$roomDes.incount + 'чел.'}
              <br />
              {this.state.chat.$roomDes.des}
            </div>
            <div
              className='chat-room-list'
              onClick={(e: any) => {
                if (e.target &&
                  e.target.dataset &&
                  (e.target.dataset?.name !== this.state.chat.$roomDes.name)
                ) {
                  ChangeRoomCommand.Execute(e.target.dataset?.num || null);
                  RoomDescrCommand.Execute();
                }
              }}
            >
              {this.state.chat.$rooms.map((el, idx) => {
                return (
                  <p
                    className='chat-room-list__item'
                    key={'chat-room-list__item' + idx}
                    data-name={el.name}
                    data-num={el.num}
                  >
                    {el.name + ' в комнате: ' + el.incount + 'чел.'} <br />
                    {el.des}
                  </p>
                );
              })}
            </div>
          </div>
        </section>
        <div
          className='chat-room-history'
          onClick={() =>
            PrevChatMessgsCommand.Execute(this.chatminid.toString())
          }
        >
          ᐱ
        </div>
        <div
          className='chat-room'
          onClick={(e: any) => {
            this.setState({
              menuPos: {
                top: e.pageY, right: e.pageX,
              },
              menuState: {
                isPrivate: this.state.menuState.isPrivate,
                nickname: this.state.menuState.nickname,
                isShown: e.target.classList.contains('chat-room__message'),
              },
              nick: e.target.dataset.name || null,
            });
          }}
        >
          {this.state.chat.$messages.map((el, idx) => {
            if (this.chatminid > el.mid) this.chatminid = el.mid;
            let messageCls = `chat-room__message${el.from === pname ? ' --self' : ''}`;
            return (
              <p
                className={messageCls}
                key={'chat-mess' + idx}
                data-name={el.from}
              >
                <span style={{ fontWeight: 'bold' }}>
                  {convertUnicode(el.dtime + ' ' + el.from)}
                </span>
                <br />{' '}
                {convertIndentsToHTML(convertUnicode(el.mtext ? el.mtext : ''))}
              </p>
            );
          })}
          <br />
          <br />
          <div className='bottom-group'>
            <label htmlFor='bottom-group__input'>
              {(this.state.menuState.isPrivate ? 'Приватно ' : '') +
              (this.state.menuState.nickname
                ? this.state.menuState.nickname
                : ' ')}
            </label>
            <input id='bottom-group__input'
              className='bottom-group__input'
              value={this.state.input}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.setState({ input: event.target.value })}
            />
            <button
              className='bottom-group__button'
              onClick={() => {
                SendChatmessCommand.Execute(convertUnicode(this.state.input), this.state.menuState.nickname || '', this.state.menuState.isPrivate)
                this.setState({ input: '' });
              }}
            >
              ▶
            </button>
          </div>
        </div>
        <Dropdown
          style={{
            position: 'absolute',
            top: this.state.menuPos.top || 0,
            left: this.state.menuPos.right || 0,
            display: this.state.menuState.isShown ? 'block' : 'none', //switch hide/show dropdown menu
          }}
          cbs={this.menuCbs}
        >
          {[
            ' 📌 Ник в сообщение', '📧 Приватное сообщение',
            ' 👤 Информация о персонаже', '🔍 Кто здесь?',
            '🧹 Очистить поля',
          ]}
        </Dropdown>
      </div>
    );
  }
}
