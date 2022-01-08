import React from "react";
import "./NavBar.scss";
import { swipeService } from "../../store/services/services";
import { useObservable } from "../../store/observableHook/observableHook";

export const NavBar = (props: any) => {
  const active = useObservable(swipeService.active);
  return (
    <nav className="menu">
      <ul className="menu__list">
        {props.frProps.map((el: any, idx: number) => {
          return (
            <li
              className={`menu__item${
                active === idx ? " menu__item_state_active" : ""
              } material-icons`}
              key={"ul" + idx}
              onClick={() => {
                if (idx === props.frProps.length - 1)
                  swipeService.toggleBackdropActive();
                else swipeService.setActive(idx);
              }}
            >
              <span>{el}</span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
