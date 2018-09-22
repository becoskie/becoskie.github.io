//sets up the reusable Navbar component
import React from "react";
import "./ScoreBar.css";

const ScoreBar = props => (
  <div className="scoreBar">
    <ul>
      <li className="message">{props.message}</li>
      <li>
        Days Fresh: {props.score} | Record Fresh Days: {props.highScore}
      </li>
    </ul>
  </div>
);
export default ScoreBar;
