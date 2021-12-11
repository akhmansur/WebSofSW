import React from "react";
import "./NavBar.scss";
import { swipeService } from "../../store/services/services";
import { useObservable } from "../../store/observableHook/observableHook";

export const NavBar = (props: any) => {
  const active = useObservable(swipeService.active)
  return (
    <div className="menu">
      {props.frProps.map((el: any, idx: number) => {
        return (
          <div className="menu-item" key={"li" + idx} onClick={() => {
            if(idx === props.frProps.length - 1)
              swipeService.toggleBackdropActive()
            else
              swipeService.setActive(idx)
            }}>
            <span className={`material-icons${active === idx? ' active': ''}`}>{el}</span>
          </div>
        );
      })}
    </div>
  );
};
