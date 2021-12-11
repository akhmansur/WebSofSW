import React from "react";
import "./ProgressBar.scss";
import { useObservable } from "../../../store/observableHook/observableHook";
import { progressService } from "../../../store/services/services";

const ProgressBar = () => {
  const progress = useObservable(progressService.pb);
  const hpBarWidth: number = (progress.hp.current / progress.hp.max) * 100;
  const spBarWidth: number = (progress.sp.current / progress.sp.max) * 100;
  const ptBarWidth: number = (progress.pt.current / progress.pt.max) * 100;

  return (
    <div className="progress-bar minion">
      <div className="pb">
        <span className="pbSpan">
          <div
            className="bar hp"
            style={{ width: hpBarWidth < 0 ? 0 : hpBarWidth + "%" }}
          ></div>
          {progress.hp.des}
          {progress.hp.current}/{progress.hp.max}
        </span>
      </div>
      <div className="pb">
        <span className="pbSpan">
          <div
            className="bar en"
            style={{ width: spBarWidth < 0 ? 0 : spBarWidth + "%" }}
          ></div>
          {progress.sp.des}
          {progress.sp.current}/{progress.sp.max}
        </span>
      </div>
      <div className="pb">
        <span className="pbSpan">
          <div
            className="bar xp"
            style={{ width: ptBarWidth < 0 ? 0 : ptBarWidth + "%" }}
          ></div>
          {progress.pt.des}
          {progress.pt.current}/{progress.pt.max}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
