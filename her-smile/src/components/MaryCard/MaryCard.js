
import React from "react";
import "./MaryCard.css";

const MaryCard = props => (
  <div className="card" onClick={props.imageClick}>
    <div className="image-container">
      <img alt={props.image.replace(".jpg", "")} src={require("../../images/" + props.image)} />
    </div>
  </div>
);

export default MaryCard;