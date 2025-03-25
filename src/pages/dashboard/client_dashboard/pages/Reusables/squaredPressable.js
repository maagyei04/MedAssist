import React from "react";
import "./squaredPressable.css";

const SquaredPressable = ({ icon, info, icon_color, background, onClick,pressed,border }) => {
  return (
    <div
      onClick={onClick}
      className="icon-text"
      style={{ background: background, cursor: "pointer",border:border }} 
    >
      <div style={{ color: icon_color }}>
        {icon}
      </div>
      <p>{info}</p>
    </div>
  );
};

export default SquaredPressable;
