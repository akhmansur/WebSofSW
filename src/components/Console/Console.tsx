import React, { useState } from "react";
import { SimpleCommand } from "../../lib/commands";
import { convertIndentsToHTML } from "../../lib/utils";
import { useObservable } from "../../store/observableHook/observableHook";
import { gameService } from "../../store/services/services";
import "./Console.scss";

export const Console = () => {
  const textLog = useObservable(gameService.textLog);
  const [command, setCommand] = useState<string>("");

  return (
    <div className="main">
      {textLog?.map((el, idx) => {
        return (
          <div className='log-item' key={"log-item" + idx}>
            {convertIndentsToHTML(el)}
            <hr
              style={{
                borderBottom: "2px dashed black",
                borderTop: "none",
                marginLeft: '0',
                width: '90%',
              }}
            />
            <br />
            <br />
          </div>
        );
      })}
      <div className="bottom-group">
        <input
          className="chat-input"
          value={command}
          onChange={(event) => setCommand(event.target.value)}
        />
        <button
          className="button-send"
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
