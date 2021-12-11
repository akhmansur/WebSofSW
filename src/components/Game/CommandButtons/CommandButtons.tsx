import React, { useState } from "react";
import "./CommandButtons.scss";
import { Command } from "../../../store/services/CommandsService";
import { SimpleCommand } from "../../../lib/commands";

interface CmdBtnsProps {
  buttons: Command[];
}

export const CommandButtons = ({ buttons }: CmdBtnsProps) => {
  const [command, setCommand] = useState<string>("");
  return (
    <div className="box-buttons">
      {buttons.map((el, idx) => {
        if (el.kay === "name" || el.kay === "X") {
          return (
            <input
              className="input minion"
              value={command}
              key={'cmd-buttons' + idx}
              onChange={(e) => {
                setCommand(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  setCommand("")
                  SimpleCommand.Execute(command)
                }
              }}
            />
          );
        }
        return (
          <div
            className="minion cmd-btn"
            key={"cmdBtn" + idx}
            onClick={() => {
              SimpleCommand.Execute(el.kay)
            }}
          >
            {el.ctxt}
          </div>
        );
      })}
    </div>
  );
};
