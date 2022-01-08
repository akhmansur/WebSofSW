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
    <section className="game-actions">
      {buttons.map((el, idx) => {
        if (el.kay === "name" || el.kay === "X") {
          return (
            <>
              <input
                className="game-actions__input minion"
                value={command}
                key={"cmd-buttons" + idx}
                onChange={(e) => {
                  setCommand(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    setCommand("");
                    SimpleCommand.Execute(command);
                  }
                }}
              />
              <button
                className="game-actions__button"
                onClick={(e) => {
                  setCommand("");
                  SimpleCommand.Execute(command);
                }}
              >
                OK
              </button>
            </>
          );
        }
        return (
          <button
            className="game-actions__button minion"
            key={"cmdBtn" + idx}
            onClick={() => {
              SimpleCommand.Execute(el.kay);
            }}
          >
            {el.ctxt}
          </button>
        );
      })}
    </section>
  );
};
