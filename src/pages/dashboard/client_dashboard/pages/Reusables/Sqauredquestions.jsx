import React from "react";
import "./Squaredquestions.css";
import Pressable from "./pressable";

function Sqauredquestions({
  question,
  options,
  nextQuestion,
  prevQuestion,
  action,
  setSelectedOption,
  selectedOption,
}) {
  const handleChange = (event) => {
    let newValue = event.target.value;

    // Check if the options are True/False
    if (options.includes("True") && options.includes("False")) {
      let binary = newValue === "True" ? 1 : 0;
      setSelectedOption(newValue);
      action(binary); // Store as 1/0
    }
    // Check if the value is a numeric string (e.g., "3", "42")
    else if (!isNaN(newValue) && newValue.trim() !== "") {
      setSelectedOption(newValue);
      let numericValue = parseInt(newValue, 10); // Convert to integer
      action(numericValue); // Store as integer
    }
    // Otherwise, store as a string
    else {
      setSelectedOption(newValue);
      action(newValue);
    }
  };

  return (
    <div id="mainbox">
      <div id="responsecolumn">
        {options.map((item, index) => (
          <div className="radio_text" key={index}>
            <input
              type="radio"
              style={{ transform: "scale(1.5)", width: "16px", height: "16px" }}
              name="options"
              value={item}
              checked={selectedOption === item}
              onChange={handleChange}
            />
            <p>{item}</p>
          </div>
        ))}
      </div>
      <div id="questioncolumn">
        <div id="ask">
          <p>{question}</p>
        </div>
        <div className="questionChange">
          <Pressable
            padd={"15px"}
            height={"10px"}
            width={"70px"}
            radius={"10px"}
            onPress={prevQuestion}
          >
            Prev
          </Pressable>
          <Pressable
            padd={"15px"}
            height={"10px"}
            width={"70px"}
            radius={"10px"}
            onPress={nextQuestion}
          >
            Next
          </Pressable>
        </div>
      </div>
    </div>
  );
}

export default Sqauredquestions;
