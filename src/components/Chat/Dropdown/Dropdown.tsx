import React, { CSSProperties } from "react";
import "./Dropdown.scss";

type DefaultProps = {
  style: CSSProperties;
}

type DropdownProps = {
  children: string[];
  cbs: { (e: any | null): void }[] | { (e: any | null): void };
}

export const Dropdown = ({ children, cbs, style }: DropdownProps & DefaultProps) => {
  return (
    <ul className='dropdownmenu' style={style}>
      {children.map((el, idx) => {
        return (
          <DropdownItem
            clickCb={Array.isArray(cbs) ? cbs[idx] : cbs}
            className='dropdown-menu-item'
            key={'dropdown-menu-item' + idx}
          >
            {el}
          </DropdownItem>
        );
      })}
    </ul>
  );
};

type DropdownItemProps = {
  children: string;
  clickCb(e: any | null): void;
  isLast?: boolean;
  className: string;
}

const DropdownItem = ({
  children,
  clickCb,
  isLast = false,
  className,
}: DropdownItemProps) => {
  return (
    <li className={`dropdownmenu${isLast ? " last" : ""}`} onClick={clickCb}>
      {children}
    </li>
  );
};
