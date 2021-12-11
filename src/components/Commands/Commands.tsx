import React from "react";
import { SimpleCommand } from "../../lib/commands";
import { useObservable } from "../../store/observableHook/observableHook";
import { commandsService } from "../../store/services/services";
import './Commands.scss'

export const Commands = () => {
  const commands = useObservable(commandsService.commands);
  
  return (
    <div className="commands">
      {commands.map((el, idx) => {
        return (
          <div
            className="command"
            key={'comm' + idx}
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
