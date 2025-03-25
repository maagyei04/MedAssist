import React, { useState } from "react";
import Sqauredquestions from "../../Reusables/Sqauredquestions";
import "./autism.css";
import { QA } from "./QuestionsAndAnswers";

export default function Autism({ autismray, setAutismray }) {
  const [index, setIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

  function handleMap(answer) {
    let updatedArray = [...autismray];
    updatedArray[index] = answer; // Store the answer at the correct index
    setAutismray(updatedArray);
  }

  function handleNextQuestion() {
    if (index < QA.length - 1) {
      setIndex(index + 1);
      let nextAnswer = autismray[index + 1] ?? ""; // Default to empty string if undefined

      if (QA[index + 1].Options.includes("True") && QA[index + 1].Options.includes("False")) {
        setSelectedOption(nextAnswer === 1 ? "True" : nextAnswer === 0 ? "False" : "");
      } else {
        setSelectedOption(nextAnswer !== "" ? nextAnswer.toString() : ""); // Ensure valid string
      }
    }
  }

  function handlePrevQuestion() {
    if (index > 0) {
      setIndex(index - 1);
      let prevAnswer = autismray[index - 1] ?? ""; // Default to empty string if undefined

      if (QA[index - 1].Options.includes("True") && QA[index - 1].Options.includes("False")) {
        setSelectedOption(prevAnswer === 1 ? "True" : prevAnswer === 0 ? "False" : "");
      } else {
        setSelectedOption(prevAnswer !== "" ? prevAnswer.toString() : ""); // Ensure valid string
      }
    }
  }

  return (
    <div id="autismmain">
      <Sqauredquestions
        question={QA[index].Question}
        options={QA[index].Options}
        nextQuestion={handleNextQuestion}
        prevQuestion={handlePrevQuestion}
        action={handleMap}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />
    </div>
  );
}
