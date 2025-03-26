import React, { useState } from 'react';
import Lottie from 'lottie-react';
import danger from '../Assets/animations/Animation - danger.json';
import healthy from '../Assets/animations/Animation - healthy.json';
import missing from '../Assets/animations/Animation - missing.json';
import touch from '../Assets/animations/Animation - touch.json';
import ambulance from '../Assets/animations/Animation - ambulance.json';

const BreastCancerScreen = ( ) => {
  const symptoms1 = [
    "radius1", "texture1", "perimeter1", "area1", "smoothness1",
    "compactness1", "concavity1", "concave_points1", "symmetry1", 
    "fractal_dimension1", "radius2", "texture2", "perimeter2",
    "area2", "smoothness2"
  ];

  const symptoms2 = [
    "compactness2", "concavity2", "concave_points2", "symmetry2",
    "fractal_dimension2", "radius3", "texture3", "perimeter3",
    "area3", "smoothness3", "compactness3", "concavity3",
    "concave_points3", "symmetry3", "fractal_dimension3"
  ];

  const [cancerdic, setCancerdic] = useState({});
  const [breastdic, setBreastdic] = useState({});
  const [predictionResult, setPredictionResult] = useState(null);
  const [probability, setProbability] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (key, value) => {
    setCancerdic(prevState => ({
      ...prevState,
      [key]: value
    }));
    setBreastdic(prevState => ({
      ...prevState,
      [key]: value
    }));
  };

  const handlePredict = () => {
    const cancerThreshold = 0.5;
    const cancerIndicators = Object.values(cancerdic).filter(value => value > cancerThreshold);
    const probabilityOfHavingDisease = cancerIndicators.length / Object.keys(cancerdic).length;
    const result = probabilityOfHavingDisease > 0.5 ? "Positive" : "Negative";
    setPredictionResult(result);
    setProbability(`Probability of having Breast Cancer: ${(probabilityOfHavingDisease * 100).toFixed(2)}%`);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col h-screen overflow-y-auto w-full">
      <div className="max-w-7xl mx-auto px-4 py-8 mb-[250px] w-full">
        <h2 className="text-xl font-bold text-gray-900 text-center mb-8">
          Breast Cancer Screening Parameters
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* First Column */}
          <div className="bg-white rounded-lg shadow-md p-6 w-full">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Primary Metrics</h3>
            {symptoms1.map((item, index) => (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </label>
                <input
                  type="number"
                  step="0.0001"
                  placeholder={`Enter ${item}`}
                  value={cancerdic[item] || ""}
                  onChange={(e) => handleChange(item, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}
          </div>

          {/* Second Column */}
          <div className="bg-white rounded-lg shadow-md p-6 w-full">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Secondary Metrics</h3>
            {symptoms2.map((item, index) => (
              <div key={index} className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </label>
                <input
                  type="number"
                  step="0.0001"
                  placeholder={`Enter ${item}`}
                  value={cancerdic[item] || ""}
                  onChange={(e) => handleChange(item, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <button 
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200 font-semibold"
            onClick={handlePredict}
          >
            Analyze Results
          </button>
        </div>
      </div>

      {/* Modal */}
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
              Predicted Outcome: <span className={`font-bold ${predictionResult === "Positive" ? "text-red-500" : "text-green-500"}`}>{predictionResult}</span>
            </p>
            <p className="mb-6">
              {probability}
            </p>
            <div className="animation-container mb-6">
              {predictionResult === "Positive" ? (
                <Lottie animationData={danger} loop width={200} height={200} />
              ) : predictionResult === "Negative" ? (
                <Lottie animationData={healthy} loop width={200} height={200} />
              ) : (
                <Lottie animationData={missing} loop width={100} height={100} />
              )}
            </div>
            {predictionResult === 'Positive' && (
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

export default BreastCancerScreen;
