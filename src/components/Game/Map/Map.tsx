import React from "react";
import "./Map.css";
import Canvas from "./Canvas/Canvas";
import { MapButtons } from "./MapButtons/MapButtons";

interface MapProps {
  emoji: string
}

export const Map = ({emoji}: MapProps) => {
  
  return (
    <div className="Map">
      <Canvas emoji={emoji} />
      <MapButtons />
    </div>
  );
};
export default Map;
