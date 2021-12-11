import React from "react";
import { MoveCommands } from "../../../../lib/commands";
import "./MapButtons.scss";

export const MapButtons = () => {
  return (
    <div className="buttons-box-fixed">
      <div className="buttons-box">
        <div className="top-button" onClick={()=> {
          MoveCommands.Execute('north')
        }}></div>
        <div className="sides-buttons">
        <div className="left-button" onClick={()=> {
          MoveCommands.Execute('west')
        }}></div>
        <div className="right-button" onClick={()=> {
          MoveCommands.Execute('east')
        }}></div></div>
        <div className="bottom-button" onClick={()=> {
          MoveCommands.Execute('south')
        }}></div>
      </div>
    </div>
  );
};
