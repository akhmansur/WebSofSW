import React, { CSSProperties } from "react";
import "./Dropdown.scss";

type DefaultProps = {
  style: CSSProperties;
  classList: {
    container: string;
    item: string;
    lastItem?: string;
  };
}

type DropdownProps = {
  children: string[];
  cbs: { (e: any | null): void }[] | { (e: any | null): void };
}

export const Dropdown = ({ children, cbs, style, classList }: DropdownProps & DefaultProps) => {
  return (
    <div className={classList.container} style={style}>
      {children.map((el, idx) => {
        return (
          <DropdownItem
            clickCb={Array.isArray(cbs) ? cbs[idx] : cbs}
            className={classList.item}
            key={classList.item + idx}
          >
            {el}
          </DropdownItem>
        );
      })}
    </div>
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
    <div className={`${className}${isLast ? " last" : ""}`} onClick={clickCb}>
      {children}
    </div>
  );
};
