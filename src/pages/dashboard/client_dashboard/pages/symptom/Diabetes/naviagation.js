import React, { useState } from "react";
import "./navigation.css";
import Pressable from "../../Reusables/pressable";
import Diabetes from "./diabetes";
import Breastcancer from "../BreastCancer/breastcancer";
import Autism from "../Autism/autism";
import danger from "../../Assets/animations/Animation - danger.json"
import healthy from "../../Assets/animations/Animation - healthy.json"
import missing from "../../Assets/animations/Animation - missing.json"
import touch from "../../Assets/animations/Animation - touch.json"
import ambulance from "../../Assets/animations/Animation - ambulance.json"
import Lottie from "lottie-react";

function Navigation({appointment,pressed}) {
  const [diseaseSelect, setDiseaseSelect] = useState([true, false, false]);
  const [diabetesDic, setDiabetesDic] = useState({});
  const [breastCancerdic, setBreastCancerdic] = useState({});
  const [autismray, setAutismray] = useState([]);
  const [predictionResult, setPredictionResult] = useState(null);
  const [probability, setProbability] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 


  function handleAppointment(){
      pressed([false,false,false,false,true,false,false]);
      appointment("Appointment")

  }
  function handleDisease(value) {
    if (value === "Diabetes") {
      setDiseaseSelect([true, false, false]);
    } else if (value === "Breast Cancer") {
      setDiseaseSelect([false, true, false]);
    } else {
      setDiseaseSelect([false, false, true]);
    }
  }

  const handlePredict = async () => {
    try {
      let selectedDisease = diseaseSelect[0]
        ? "Diabetes"
        : diseaseSelect[1]
        ? "Breast Cancer"
        : "Autism";
      let requestData = { disease: selectedDisease };
  
      if (selectedDisease === "Diabetes") {
        requestData = { ...diabetesDic, disease: "Diabetes" };
      } else if (selectedDisease === "Breast Cancer") {
        requestData = { ...breastCancerdic, disease: "Breast Cancer" };
      } else {
        requestData = { disease: "Autism", features: autismray };
      }
  
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
  
      const data = await response.json();
      if (data.error) {
        console.error("Error:", data.error);
        setPredictionResult(`Error: ${data.error}`);
        setProbability(null);
      } else {
        console.log("Prediction:", data.prediction, "Probability:", data.probability);
        const probabilityOfHavingDisease = data.probability[1]
        const result=data.prediction===1?"Positive":"Negative"
        setPredictionResult(result);
        setProbability(`Probability of having ${selectedDisease}: ${(probabilityOfHavingDisease * 100).toFixed(2)}%`);
      }
  
      setIsModalOpen(true);
    } catch (error) {
      console.error("API Call Error:", error);
      setPredictionResult("API Error: Unable to make the request.");
      setProbability(null);
      setIsModalOpen(true);
    }
  };
  

  

  return (
    <div className="content">
      <div id="row1">
        <p id="welcome">Welcome User!</p>
        <p className="text1">AI-generated insights based on input data</p>
        <div id="selectD">
          <p className="text1">
            Please select one of the diseases below to get insights and analysis
            based on your input.
          </p>
        </div>
      </div>
      <div id="row2">
        <div id="diseaseSelect">
          <Pressable
            onPress={() => handleDisease("Diabetes")}
            padd={10}
            width={150}
            pressed={diseaseSelect[0]}
          >
            Diabetes
          </Pressable>
          <Pressable
            onPress={() => handleDisease("Breast Cancer")}
            padd={10}
            width={150}
            pressed={diseaseSelect[1]}
          >
            Breast Cancer
          </Pressable>
          <Pressable
            onPress={() => handleDisease("Autism")}
            padd={10}
            width={150}
            pressed={diseaseSelect[2]}
          >
            Autism
          </Pressable>
        </div>
        {diseaseSelect[0] && <Diabetes setDiabetesDic={setDiabetesDic} />}
        {diseaseSelect[1] && <Breastcancer setBreastdic={setBreastCancerdic} />}
        {diseaseSelect[2] && (
          <Autism autismray={autismray} setAutismray={setAutismray} />
        )}
      </div>
      <div id="row3">
        <Pressable
          onPress={handlePredict}
          padd={10}
          width={200}
          background={"rgba(0,40,104,1)"}
        >
          Predict Outcome
        </Pressable>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => setIsModalOpen(false)}>
            &times;
          </span>
          
          <div className="predictDetail">
            <h3>Prediction Result</h3>
            <p className="result-text">{`Predicted Outcome: ${predictionResult}`}</p>
            <p className="probability-text">{probability}</p>
            
            <div className="animation-container">
              {predictionResult === "Positive" ? (
                <Lottie animationData={danger} loop />
              ) : predictionResult === "Negative" ? (
                <Lottie animationData={healthy} loop />
              ) : (
                <Lottie animationData={missing} loop />
              )}
            </div>
          </div>
          
          {predictionResult === "Positive" && (
            <div className="doctorRequest">
              <h3>Contact Specialist</h3>
              <div className="contact">
                <div className="contact-item">
                  <Lottie animationData={ambulance} loop />
                </div>
                <div className="contact-item" onClick={handleAppointment}>
                  <Lottie animationData={touch} loop />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
      )}
    </div>
  );
}

export default Navigation;
