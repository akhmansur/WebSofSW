import React, { useState, Dispatch } from "react";
import { useObservable } from "../../store/observableHook/observableHook";
import { swipeService } from "../../store/services/services";

interface Points {
  x: number | null;
  y: number | null;
}

export const SwipeListener = (props: any) => {
  let [points, setPoints] = useState<Points>({ x: null, y: null });
  const active = useObservable(swipeService.active)
  const childWithActiveProp = React.Children.map(props.children,(el: any, idx: number) => {
    if (active === idx) {
      return React.cloneElement(el, 
        {
          className: `${el.props.className} active`,
          style: {
            transform: `translateX(0)`,
            transition: `transform 1s`
          }
        });          
    }
    else 
      return React.cloneElement(el, 
        {
          className: `${el.props.className}`,
          style: {
            transform: `translateX(${(idx - active)*100}vw)`,
            transition: `transform 1s`
          }
        });
  })
  return (
    <div
      onMouseDown={(mouseDownEvent) =>
        handleMouseDown(mouseDownEvent, setPoints)
      }
      onMouseMove={(mouseMoveEvent) =>
        handleMouseMove(
          mouseMoveEvent,
          points,
          active,
          props.children.length,
          setPoints,
        )
      }
      onMouseUp={() => setPoints({ x: null, y: null })}

      onTouchStart={(touchEvent) =>
        handleTouchStart(touchEvent, setPoints)}

      onTouchMove={(touchEvent) =>
        handleTouchMove(
          touchEvent,
          points,
          active,
          props.children.length,
          setPoints,
        )}
    >
      {childWithActiveProp}
    </div>
  );
};

function handleMouseDown(
  evt: React.MouseEvent,
  setPoints: Dispatch<Points>
): void {
  setPoints({ x: evt.clientX, y: evt.clientY });
}

function handleMouseMove(
  evt: React.MouseEvent,
  points: Points,
  active: number,
  fragmentsCount: number,
  setPoints: Dispatch<Points>,
): void {
  if (!points.x || !points.y) return;

  evt.preventDefault()

  let xUp = evt.clientX;
  let yUp = evt.clientY;

  let xDiff = points.x - xUp;
  let yDiff = points.y - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {

    if (xDiff > 0) {
      if (xDiff > 150) {  //right swipe
        setPoints({x: null, y: null})
        active === fragmentsCount-1 ? swipeService.setActive(0) : swipeService.setActive(active + 1);
      }
    } else {
      if (xDiff < -150) {  //left swipe
        setPoints({x: null, y: null})
        active === 0 ? swipeService.setActive(fragmentsCount-1) : swipeService.setActive(active - 1);
        if(points.x <10 && active === 0) {
          // TODO
        }
      }
    }
  } else {
    if (yDiff > 0) {
      /* up swipe */
    } else {
      /* down swipe */
    }
  }
}

function handleTouchStart(
  evt: React.TouchEvent,
  setPoints: Dispatch<Points>
): void {
  setPoints({ x: evt.changedTouches[0]?.clientX, y: evt.changedTouches[0]?.clientY });
}

function handleTouchMove(
  evt: React.TouchEvent,
  points: Points,
  active: number,
  fragmentsCount: number,
  setPoints: Dispatch<Points>,
): void {
  if (!points.x || !points.y) return;


  let xUp = evt.changedTouches[0].clientX;
  let yUp = evt.changedTouches[0].clientY;

  let xDiff = points.x - xUp;
  let yDiff = points.y - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {

    if (xDiff > 0) {
      if (xDiff > 150) {  //right swipe
        setPoints({x: null, y: null})
        active === fragmentsCount-1 ? swipeService.setActive(0) : swipeService.setActive(active + 1);
      }
    } else {
      if (xDiff < -150) {  //left swipe
        setPoints({x: null, y: null})
        active === 0 ? swipeService.setActive(fragmentsCount-1) : swipeService.setActive(active - 1);
        if(points.x <10 && active === 0) {
          // TODO
        }
      }
    }
  } else {
    if (yDiff > 0) {
      /* up swipe */
    } else {
      /* down swipe */
    }
  }
}
