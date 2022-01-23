import React from 'react';
import './CommandButtons.scss';
import { Command } from '../../../store/services/CommandsService';
import { SimpleCommand } from '../../../lib/commands';
import { useInput } from '../../../lib/hooks/useInput';

interface CmdBtnsProps {
  buttons: Command[];
}

export const CommandButtons = ({ buttons }: CmdBtnsProps) => {
  const {value, reset, bind} = useInput('');

  return (
    <section className='game-actions'>
      {buttons.map((el, idx) => {
        if (el.kay === 'name' || el.kay === 'X') {
          return (
            <>
              <input
                className='game-actions__input minion'
                key={'cmd-buttons' + idx}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    reset()
                    SimpleCommand.Execute(value);
                  }
                }}
                {...bind}
              />
              <button
                className='game-actions__button minion'
                onClick={() => {
                  reset()
                  SimpleCommand.Execute(value);
                }}
              >
                OK
              </button>
            </>
          );
        }
        return (
          <button
            className='game-actions__button minion'
            key={'cmdBtn' + idx}
            onClick={() => SimpleCommand.Execute(el.kay)}
          >
            {el.ctxt}
          </button>
        );
      })}
    </section>
  );
};
