import React, { useState } from "react";
import { SimpleCommand } from "../../lib/commands";
import { convertIndentsToHTML } from "../../lib/utils";
import { useObservable } from "../../store/observableHook/observableHook";
import { gameService } from "../../store/services/services";
import "./Console.scss";

export const Console = () => {
  const $textLog = useObservable(gameService.textLog);
  const [command, setCommand] = useState<string>("");

  return (
    <div className="game-log">
      {$textLog?.map((el, idx) => {
        return (
          <div className='game-log__tem' key={"log-item" + idx}>
            {convertIndentsToHTML(el)}
            <hr/>
            <br />
            <br />
          </div>
        );
      })}
      <div className="bottom-group">
        <input
          className="bottom-group__input"
          value={command}
          onChange={(event) => setCommand(event.target.value)}
        />
        <button
          className="bottom-group__button"
          onClick={() => {
            SimpleCommand.Execute(command)
            gameService.addToLog([command]);
            setCommand("");
          }}
        >
          ▶
        </button>
      </div>
    </div>
  );
};
