import React, { useRef, useEffect } from "react";
import { useObservable } from "../../../../store/observableHook/observableHook";
import { gameService, mapService, settingsService } from "../../../../store/services/services";
import getImage from "../images";
import './Canvas.css'

interface CanvasProps {
  width?: string;
  height?: string;
  emoji: string
}

const Canvas = ({emoji}: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const $mapC = useObservable(mapService.mapC);
  const $mapP = useObservable(mapService.mapP);
  const $point = useObservable(gameService.point)
  const { theme: $theme } = useObservable(settingsService.settings);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D | null,x: number, y:number, c:string) => {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        const sImg = new Image();
        const cx = x;
        const cy = y;
        let tx, ty;
        let sImgSrc = getImage("s01", $theme.charAt(0))
        sImg.src = sImgSrc? sImgSrc: '';
        const rz = 16;
        const hmc = Math.round(canvas.width / 2 - 1);
        const vmc = Math.round(canvas.height / 2);
        const hdc = hmc / rz;
        const vdc = vmc / rz;
    
        for (let i = -1 * hdc - 1; i <= hdc; i++) {
          for (let j = -1 * vdc; j <= vdc + 1; j++) {
            tx = Math.round(cx + i).toString();
            ty = Math.round(cy + j).toString();
            let pt = $mapC.indexOf(tx + ":" + ty);
            if (pt > -1) {
              const img = new Image();
              img.onload = function () {
                ctx.drawImage(img, hmc + i * rz, vmc - j * rz);
              };
              let imgSrc = getImage($mapP[pt], $theme.charAt(0))
              img.src = imgSrc? imgSrc: "";
            }
          }
        }
        ctx.globalCompositeOperation = "destination-over";
        ctx.font = "16px minion";
        ctx.strokeText(emoji, hmc - 7, vmc + 10 , 40);
      };
      const render = () => {
        if (context) context.clearRect(0, 0, canvas.width, canvas.height);
        draw(canvas, context,$point.x, $point.y, $point.c);
      };
      render();
    }
  }, [$point, $mapC, $mapP, emoji, $theme]);
  
  return <canvas className="canvas" ref={canvasRef} />;
};

Canvas.defaultProps = {
    width: window.innerWidth,
    height: window.innerHeight
};

export default Canvas;
