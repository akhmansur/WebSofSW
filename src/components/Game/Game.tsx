import React from "react";
import ProgressBar from "./ProgressBar/ProgressBar";
import { Map } from "./Map/Map";
import { useObservable } from "../../store/observableHook/observableHook";
import { gameService, progressService } from "../../store/services/services";
import { CommandButtons } from "./CommandButtons/CommandButtons";
import { convertIndentsToHTML } from "../../lib/utils";
import "./Game.scss";

export const Game = () => {
  const genCharInfo = useObservable(progressService.genCharInfo);
  const gameInfo = useObservable(gameService.gameInfo);
  console.log((document.querySelector('.Map') as HTMLElement));
  

  return (
    <div className="game">
      <ProgressBar></ProgressBar>
      <Map emoji={genCharInfo.emoji}></Map>
      <div className="main">
        <span className="minion">
          {genCharInfo.pname +
            " " +
            genCharInfo.plev.ldes +
            genCharInfo.plev.lev}
        </span>
        <p className="minion">
          {gameInfo.text.map((el, idx) => {
            if (!el) return "";
            else
              return (
                <span key={"game-txt" + idx}>{convertIndentsToHTML(el)}</span>
              );
          })}
        </p>
        {gameInfo.lynk ? (
          <a
            href={gameInfo.lynk.a}
            className="minion"
            target="_blank"
            rel="noreferrer"
          >
            {gameInfo.lynk.text}
          </a>
        ) : (
          ""
        )}
      </div>
      <CommandButtons buttons={gameInfo.comm} />
    </div>
  );
};
