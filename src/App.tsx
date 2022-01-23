import React, { useEffect } from "react";
import "./App.scss";

import { SwipeListener } from "./components/SwipeListener/SwipeListener";
import { NavBar } from "./components/NavBar/NavBar";
import { Game } from "./components/Game/Game";
import { Commands } from "./components/Commands/Commands";
import { Console } from "./components/Console/Console";
import { Chat } from "./components/Chat/Chat";
import { gameClient } from "./lib/clients";
import { Settings } from "./components/Settings/Settings";
import { swipeService } from "./store/services/services";
import { Loader } from "./components/Loader/Loader";
import { useObservable } from "./store/observableHook/observableHook";

export const App = () => {
  useEffect(() => {
    gameClient.startInterval();
    return () => gameClient.clearInterval();
  }, []);
  const $isLoading = useObservable(swipeService.isLoading)
  const $isActive = useObservable(swipeService.backdropActive)
  let fragmentsAmount = 3;
  let menuIcons: string[] = [
    "sports_esports",
    "settings_accessibility",
    "forum",
    "settings",
    "tune",
  ];
  return (
    <>
      <SwipeListener>
        <div className="fragment">
          <Game></Game>
        </div>
        <div className="fragment">
          <Commands></Commands>
        </div>
        <div className="fragment">
          <Chat></Chat>
        </div>
        <div className="fragment">
          <Console></Console>
        </div>
      </SwipeListener>
      <Settings isActive={$isActive} />
      <NavBar frProps={menuIcons} amount={fragmentsAmount} />
      <Loader isLoading={$isLoading}/>
    </>
  );
};
