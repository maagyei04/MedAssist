import React from "react";
import "./Fieldbox.css";

function Fieldbox({ width, placeholder, value, onChange }) {
  return (
    <div className="fieldbox" style={{ width: width }}>
      <input 
        type="number" 
        placeholder={placeholder} 
        value={value} 
        onChange={onChange} 
      />
      <div
        style={{
          background: "rgba(7,142,255,1)",
          width: "20%",
          height: "100%",
        }}
      ></div>
    </div>
  );
}

export default Fieldbox;
