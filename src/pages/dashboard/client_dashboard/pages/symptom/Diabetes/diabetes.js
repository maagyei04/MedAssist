import React, { useState } from "react";
import "./diabetes.css";
import Pressable from "../../Reusables/pressable";

function Diabetes({ setDiabetesDic }) {
  const questions = [
    "Polyuria",
    "Polydipsia",
    "Vision burning",
    "Irritability",
    "Partial paresis",
    "Alopecia",
  ];
  const questions2 = [
    "Sudden weight loss",
    "Weakness",
    "Polyphagia",
    "Genital thrush",
    "Itching",
    "Delayed healing",
    "Muscle stiffness",
    "Obesity",
  ];

  const [selectedOptions1, setSelectedOptions1] = useState({
    "Polyuria": 1,
    "Polydipsia": 1,
    "Vision burning": 1,
    "Irritability": 1,
    "Partial paresis": 1,
    "Alopecia": 1,
  });

  const [selectedOptions2, setSelectedOptions2] = useState({
    "Sudden weight loss": 1,
    "Weakness": 1,
    "Polyphagia": 1,
    "Genital thrush":1,
    "Itching": 1,
    "Delayed healing": 1,
    "Muscle stiffness": 1,
    "Obesity": 1,
  });
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
 

  const handlePress1 = (value, choice) => {
    setSelectedOptions1((prev) => {
      const updatedSelections = { ...prev, [value]: choice };
      setDiabetesDic((prevDic) => ({ ...prevDic, ...updatedSelections }));
      return updatedSelections;
    });
  };

  const handlePress2 = (value, choice) => {
    setSelectedOptions2((prev) => {
      const updatedSelections = { ...prev, [value]: choice };
      setDiabetesDic((prevDic) => ({ ...prevDic, ...updatedSelections }));
      return updatedSelections;
    });
  };

  const handleAgeChange = (e) => {
    const newAge = e.target.value;
    setAge(newAge);
    setDiabetesDic((prevDic) => ({ ...prevDic, age: newAge }));
  };

  const handleGenderChange = (e) => {
    const newGender = e.target.value;
    setGender(newGender);
    setDiabetesDic((prevDic) => ({ ...prevDic, gender: newGender }));
  };

  return (
    <div id="actions">
      <div className="col">
        <div>
          <p>Age</p>
          <div className="fieldbox">
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={handleAgeChange}
            />
            <div style={{ background: "rgba(7,142,255,1)", width: "20%", height: "100%" }}></div>
          </div>
          <p>Gender</p>
          <div className="fieldbox">
            <select
              style={{ width: "80%", border: "none" }}
              value={gender}
              onChange={handleGenderChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <div style={{ background: "rgba(7,142,255,1)", width: "20%", height: "100%" }}></div>
          </div>
        </div>
        {questions.map((value, index) => (
          <div key={index}>
            <p style={{ marginLeft: 5, marginBottom: 2 }}>{value}</p>
            <div className="grouping">
              <Pressable
                onPress={() => handlePress1(value, 1)}
                padd={10}
                width={80}
                selector={true}
                pressed={selectedOptions1[value] === 1}
              >
                Yes
              </Pressable>
              <Pressable
                onPress={() => handlePress1(value, 0)}
                padd={10}
                width={80}
                selector={true}
                pressed={selectedOptions1[value] === 0}
              >
                No
              </Pressable>
            </div>
          </div>
        ))}
      </div>
      <div className="col">
        {questions2.map((value, index) => (
          <div key={index}>
            <p style={{ marginLeft: 5, marginBottom: 2 }}>{value}</p>
            <div className="grouping">
              <Pressable
                onPress={() => handlePress2(value, 1)}
                padd={10}
                width={80}
                selector={true}
                pressed={selectedOptions2[value] === 1}
              >
                Yes
              </Pressable>
              <Pressable
                onPress={() => handlePress2(value, 0)}
                padd={10}
                width={80}
                selector={true}
                pressed={selectedOptions2[value] === 0}
              >
                No
              </Pressable>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Diabetes;
