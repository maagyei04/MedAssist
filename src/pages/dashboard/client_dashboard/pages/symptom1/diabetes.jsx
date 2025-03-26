import Lottie from 'lottie-react';
import React, { useState } from 'react';
import danger from "../Assets/animations/Animation - danger.json"
import healthy from "../Assets/animations/Animation - healthy.json"
import missing from "../Assets/animations/Animation - missing.json"
import touch from "../Assets/animations/Animation - touch.json"
import ambulance from "../Assets/animations/Animation - ambulance.json"

const DiabetesScreen = () => {
  const [symptoms, setSymptoms] = useState(['Polyuria', 'Polydipsia', 'Alopecia', 'Weakness', 'Partial paresis', 'Irritability', 'Delayed healing', 'Muscle stiffness', 'Polyphagia', 'Genital thrush', 'Vision burning', 'Itching', 'Obesity', 'Sudden weight loss']);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [predictionResult, setPredictionResult] = useState('');
  const [probability, setProbability] = useState('');

  // Define symptom weights based on their importance for diabetes diagnosis
  const symptomWeights = {
    'Polyuria': 0.15, // Excessive urination - key symptom
    'Polydipsia': 0.15, // Excessive thirst - key symptom
    'Polyphagia': 0.15, // Excessive hunger - key symptom
    'Sudden weight loss': 0.12, // Major symptom
    'Weakness': 0.08,
    'Delayed healing': 0.07,
    'Vision burning': 0.06,
    'Obesity': 0.06,
    'Genital thrush': 0.05,
    'Irritability': 0.03,
    'Muscle stiffness': 0.03,
    'Itching': 0.02,
    'Partial paresis': 0.02,
    'Alopecia': 0.01
  };

  const questions = [
    { question: 'Polyuria', help: 'Excessive urination' },
    { question: 'Polydipsia', help: 'Excessive thirst' },
    { question: 'Alopecia', help: 'Hair loss' },
    { question: 'Weakness', help: 'Feeling weak or tired' },
    { question: 'Partial paresis', help: 'Partial paralysis or weakness' },
    { question: 'Irritability', help: 'Feeling easily annoyed or agitated' },
    { question: 'Delayed healing', help: 'Wounds or cuts taking longer to heal' },
  ];

  const questions2 = [
    { question: 'Muscle stiffness', help: 'Stiffness or cramps in muscles' },
    { question: 'Obesity', help: 'Being overweight or obese' },
    { question: 'Genital thrush', help: 'Fungal infection in the genital area' },
    { question: 'Vision burning', help: 'Burning sensation in the eyes' },
    { question: 'Itching', help: 'Persistent itching' },
    { question: 'Polyphagia', help: 'Excessive hunger' },
    { question: 'Sudden weight loss', help: 'Unexplained weight loss' },
  ];

  const [selectedOptions1, setSelectedOptions1] = useState({
    'Polyuria': 1,
    'Polydipsia': 1,
    'Irritability': 1,
    'Partial paresis': 1,
    'Alopecia': 1,
    'Weakness': 1,
    'Delayed healing': 1,
  });

  const [selectedOptions2, setSelectedOptions2] = useState({
    'Muscle stiffness': 1,
    'Polyphagia': 1,
    'Genital thrush': 1,
    'Vision burning': 1,
    'Itching': 1,
    'Obesity': 1,
    'Sudden weight loss': 1,
  });

  const handlePress1 = (value, choice) => {
    setSelectedOptions1((prev) => {
      const updatedSelections = { ...prev, [value]: choice };
      setSymptoms(Object.entries(updatedSelections).filter(([_, value]) => value === 1).map(([key]) => key));
      return updatedSelections;
    });
  };

  const handlePress2 = (value, choice) => {
    setSelectedOptions2((prev) => {
      const updatedSelections = { ...prev, [value]: choice };
      setSymptoms(Object.entries({ ...selectedOptions1, ...updatedSelections }).filter(([_, value]) => value === 1).map(([key]) => key));
      return updatedSelections;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate weighted probability based on present symptoms
    let totalWeight = 0;
    let presentSymptomsWeight = 0;

    // Sum up weights of present symptoms
    symptoms.forEach(symptom => {
      if (symptomWeights[symptom]) {
        totalWeight += symptomWeights[symptom];
        presentSymptomsWeight += symptomWeights[symptom];
      }
    });

    // Calculate final probability as a percentage
    const probabilityScore = (presentSymptomsWeight / 1) * 100;

    // Determine risk level based on probability
    if (probabilityScore >= 70) {
      setDiagnosis(['High risk of Diabetes']);
      setPredictionResult('High Risk');
      setProbability(`Probability of having Diabetes: ${probabilityScore.toFixed(1)}%`);
    } else if (probabilityScore >= 40) {
      setDiagnosis(['Moderate risk of Diabetes']);
      setPredictionResult('Moderate Risk');
      setProbability(`Probability of having Diabetes: ${probabilityScore.toFixed(1)}%`);
    } else {
      setDiagnosis(['Low risk of Diabetes']);
      setPredictionResult('Low Risk');
      setProbability(`Probability of having Diabetes: ${probabilityScore.toFixed(1)}%`);
    }

    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col h-screen overflow-y-auto">
      <h2 className="text-xl font-bold mb-8">Diabetes Symptom Checker</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-3xl mb-[250px]">
        <div className="mb-4">
          <label htmlFor="age" className="block font-bold mb-2">
            Age:
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block font-bold mb-2">
            Gender:
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="grid grid-cols-4 gap-8 max-w-3xl">
          {questions.map(({ question, help }, index) => (
            <div key={index} className="flex flex-col items-center">
              <label htmlFor={`question-${index}`} className="font-bold w-full">
                {question}
                <span className="ml-1 text-gray-500 cursor-help" title={help}>
                  ?
                </span>
              </label>
              <span className='italic w-full'>({help})</span>
              <div className="flex">
                <button
                  type="button"
                  id={`question-${index}`}
                  onClick={() => handlePress1(question, 1)}
                  className={`px-4 py-2 rounded-l-md ${
                    selectedOptions1[question] === 1
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handlePress1(question, 0)}
                  className={`px-4 py-2 rounded-r-md ${
                    selectedOptions1[question] === 0
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-8 mt-8 max-w-3xl">
          {questions2.map(({ question, help }, index) => (
            <div key={index} className="flex flex-col items-center">
              <label htmlFor={`question2-${index}`} className="font-bold w-full">
                {question}
                <span className="ml-1 text-gray-500 cursor-help" title={help}>
                  ?
                </span>
              </label>
               <span className='italic w-full'>({help})</span>
              <div className="flex">
                <button
                  type="button"
                  id={`question2-${index}`}
                  onClick={() => handlePress2(question, 1)}
                  className={`px-4 py-2 rounded-l-md ${
                    selectedOptions2[question] === 1
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handlePress2(question, 0)}
                  className={`px-4 py-2 rounded-r-md ${
                    selectedOptions2[question] === 0
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-colors duration-300 mt-4"
        >
          Get Diagnosis
        </button>
      </form>
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
              Predicted Outcome: <span className={`font-bold ${predictionResult === "High Risk" ? "text-red-500" : predictionResult === "Moderate Risk" ? "text-yellow-500" : "text-green-500"}`}>{predictionResult}</span>
            </p>
            <p className="mb-6">
              {probability}
            </p>
            <div className="animation-container mb-6">
              {predictionResult === "High Risk" ? (
                <Lottie animationData={danger} loop width={200} height={200} />
              ) : predictionResult === "Low Risk" ? (
                <Lottie animationData={healthy} loop width={200} height={200} />
              ) : (
                <Lottie animationData={missing} loop width={100} height={100} />
              )}
            </div>
            {predictionResult === 'High Risk' && (
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-4">Contact Specialist</h3>
                <div className="flex justify-center">
                  <div className="mr-4">
                    <Lottie animationData={ambulance} loop width={50} height={50} />
                  </div>
                  <div onClick={() => navigate('/client_dashboard/appointment')}>
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

export default DiabetesScreen;
