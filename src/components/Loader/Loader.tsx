import React from "react";
import "./Loader.scss";

type LoaderProps = {
  isLoading: boolean;
};

export const Loader = ({ isLoading }: LoaderProps) => {
  return (
    <div
      className="hexdots-loader"
      style={{ display: isLoading ? "block" : "none" }}
    ></div>
  );
};
