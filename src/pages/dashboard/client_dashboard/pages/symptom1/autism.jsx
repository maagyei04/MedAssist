import React, { useState } from 'react';
import Lottie from 'lottie-react';
import danger from '../Assets/animations/Animation - danger.json';
import healthy from '../Assets/animations/Animation - healthy.json';
import missing from '../Assets/animations/Animation - missing.json';
import touch from '../Assets/animations/Animation - touch.json';
import ambulance from '../Assets/animations/Animation - ambulance.json';

const AutismScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [predictionResult, setPredictionResult] = useState(null);
  const [probability, setProbability] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const Questions = [
    {
      Question: "Difficulty in social interactions",
      Options: ["True", "False"],
    },
    {
      Question: "Preference for routines and repetition",
      Options: ["True", "False"],
    },
    {
      Question: "Sensory sensitivities (e.g., sound, texture)",
      Options: ["True", "False"],
    },
    {
      Question: "Difficulty understanding emotions",
      Options: ["True", "False"],
    },
    {
      Question: "Unusual speech patterns or communication styles",
      Options: ["True", "False"],
    },
    {
      Question: "Strong focus on specific interests",
      Options: ["True", "False"],
    },
    {
      Question: "Difficulty with changes in environment",
      Options: ["True", "False"],
    },
    {
      Question: "Challenges in making eye contact",
      Options: ["True", "False"],
    },
    {
      Question: "Literal interpretation of language",
      Options: ["True", "False"],
    },
    {
      Question: "Unusual responses to social cues",
      Options: ["True", "False"],
    },
    { Question: ["Age"], Options: ["4", "5", "7", "8", "9", "10", "11"] },
    { Question: ["Gender"], Options: ["Male", "Female"] },
    {
      Question: "Ethnicity",
      Options: [
        "Others",
        "Middle Eastern ",
        "White-European",
        "Black",
        "South Asian",
        "Asian",
        "Pasifika",
        "Hispanic",
        "Turkish",
        "Latino",
      ],
    },
    { Question: ["Do you have jaundice or any history of jaundice"], Options: ["yes", "no"] },
    { Question: ["Is There Any Autism History In Family Lineage"], Options: ["yes", "no"] },
    { Question: ["Used Our Platform Before?"], Options: ["yes", "no"] },
    { Question: ["Relation To Victim"], Options: ['Parent', 'Self', 'Relative', 'Health care professional'] },
  ];

  const handleOptionClick = (option) => {
    setAnswers([...answers, option]);
    if (currentQuestion === Questions.length - 1) {
      const autismSymptoms = answers.filter((answer) => answer === "True").length;
      const diagnosis = autismSymptoms >= 6 ? "Autism Spectrum Disorder" : "No Autism Spectrum Disorder";
      setPredictionResult(diagnosis);
      setProbability(`Probability of having Autism Spectrum Disorder: ${(autismSymptoms / Questions.length * 100).toFixed(2)}%`);
      setIsModalOpen(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <h2 className="text-xl font-bold mb-8">Autism Screening</h2>
      <p className="text-md mb-4">Instructions: Answer the following questions to determine if you or your child may have autism spectrum disorder. Select "True" if the statement applies, or "False" if it does not.</p>
      <div className="bg-white rounded-lg shadow-md p-8">
        <h3 className="text-xl font-semibold mb-4">{Questions[currentQuestion].Question}</h3>
        <div className="grid grid-cols-2 gap-4">
          {Questions[currentQuestion].Options.map((option) => (
            <button
              key={option}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Prediction Result</h3>
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => {
                  setIsModalOpen(false);
                  setPredictionResult('');
                  setProbability('');
                }}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="mb-4">
              Predicted Outcome: <span className={`font-bold ${predictionResult === "Autism Spectrum Disorder" ? "text-red-500" : "text-green-500"}`}>{predictionResult}</span>
            </p>
            <p className="mb-6">
              {probability}
            </p>
            <div className="animation-container mb-6">
              {predictionResult === "Autism Spectrum Disorder" ? (
                <Lottie animationData={danger} loop width={200} height={200} />
              ) : predictionResult === "No Autism Spectrum Disorder" ? (
                <Lottie animationData={healthy} loop width={200} height={200} />
              ) : (
                <Lottie animationData={missing} loop width={100} height={100} />
              )}
            </div>
            {predictionResult === 'Autism Spectrum Disorder' && (
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-4">Contact Specialist</h3>
                <div className="flex justify-center">
                  <div className="mr-4">
                    <Lottie animationData={ambulance} loop width={50} height={50} />
                  </div>
                  <div>
                    <Lottie animationData={touch} loop width={100} height={100} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AutismScreen;
