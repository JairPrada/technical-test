import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStepForward,
  faPlayCircle,
  faStepBackward,
  faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faRandom } from "@fortawesome/free-solid-svg-icons";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { faVolumeDown } from "@fortawesome/free-solid-svg-icons";
import "./_player.scss";

export default function Player() {
  const [state, setState] = useState({ color: "#CECEDC" });
  const change = () => {
    if (state.color === "red") {
      setState({ color: "#CECEDC" });
    } else {
      setState({ color: "red" });
    }
  };
  return (
    <div className="player">
      <div className="player__album">
        <span />
        <p>Nothing's playing</p>
      </div>
      <div className="player__controls">
        <FontAwesomeIcon icon={faStepBackward} />
        <FontAwesomeIcon icon={faPlayCircle} />
        <FontAwesomeIcon icon={faStepForward} />
      </div>
      <div className="player__seekbar" />
      <div className="player__actions">
        <FontAwesomeIcon icon={faEllipsisH} />
        <FontAwesomeIcon
          icon={faHeart}
          style={{ color: state.color }}
          onClick={change}
        />
        <FontAwesomeIcon icon={faRandom} />
        <FontAwesomeIcon icon={faRetweet} />
        <FontAwesomeIcon icon={faVolumeDown} />
      </div>
    </div>
  );
}
