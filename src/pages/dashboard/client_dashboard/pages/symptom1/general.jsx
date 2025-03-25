import React, { useState } from 'react';
import axios from 'axios';

const GeneralScreen = () => {
  const [symptoms, setSymptoms] = useState(['']);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [medicalHistory, setMedicalHistory] = useState(['']);
  const [currentMedications, setCurrentMedications] = useState(['']);
  const [allergies, setAllergies] = useState(['']);
  const [smoking, setSmoking] = useState(false);
  const [alcohol, setAlcohol] = useState('');
  const [exercise, setExercise] = useState('');
  const [diet, setDiet] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      url: 'https://ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com/analyzeSymptomsAndDiagnose',
      params: { noqueue: '1' },
      headers: {
        'x-rapidapi-key': '4bed3817f3msh8149d1c737c8a54p17ebc9jsn66da4802ee0d',
        'x-rapidapi-host': 'ai-medical-diagnosis-api-symptoms-to-results.p.rapidapi.com',
        'Content-Type': 'application/json'
      },
      data: {
        symptoms,
        patientInfo: {
          age: parseInt(age),
          gender,
          height: parseInt(height),
          weight: parseInt(weight),
          medicalHistory,
          currentMedications,
          allergies,
          lifestyle: {
            smoking,
            alcohol,
            exercise,
            diet
          }
        },
        lang: 'en'
      }
    };

    try {
      const response = await axios.request(options);
      setDiagnosis(response.data.result.analysis.possibleConditions);
      console.log(diagnosis);
      setShowModal(true);
    } catch (error) {
      console.error(error);
      console.log(error);
      setShowModal(true);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-y-auto0">
      <div className="w-full p-4 flex-grow max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-8">General Symptom Checker</h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-wrap mb-[250px]">
          <div className="mb-4 w-full">
            <label htmlFor="symptoms" className="block font-bold mb-2 w-full">
              Symptoms: (seperated by commas)
            </label>
            <input
              type="text"
              id="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value.split(','))}
              placeholder="E.g. Fever, Headache, Fatigue, ... etc"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="age" className="block font-bold mb-2 w-full">
              Age:
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter your age"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="gender" className="block font-bold mb-2 w-full">
              Gender:
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="height" className="block font-bold mb-2 w-full">
              Height (cm): (1 foot = 30.48 cm)
            </label>
            <input
              type="number"
              id="height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Enter your height in cm"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="weight" className="block font-bold mb-2 w-full">
              Weight (kg):
            </label>
            <input
              type="number"
              id="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter your weight in kg"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="medicalHistory" className="block font-bold mb-2 w-full">
              Medical History:
            </label>
            <input
              type="text"
              id="medicalHistory"
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value.split(','))}
              placeholder="Enter medical history separated by commas"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="currentMedications" className="block font-bold mb-2 w-full">
              Current Medications:
            </label>
            <input
              type="text"
              id="currentMedications"
              value={currentMedications}
              onChange={(e) => setCurrentMedications(e.target.value.split(','))}
              placeholder="Enter current medications separated by commas"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="allergies" className="block font-bold mb-2 w-full">
              Allergies:
            </label>
            <input
              type="text"
              id="allergies"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value.split(','))}
              placeholder="Enter allergies separated by commas"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 w-full flex items-center">
            <label htmlFor="smoking" className="block font-bold mb-2 w-full">
              Smoking:
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="smoking"
                checked={smoking}
                onChange={(e) => setSmoking(e.target.checked)}
                className="mr-2"
              />
              <span>Do you smoke?</span>
            </div>
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="alcohol" className="block font-bold mb-2 w-full">
              Alcohol Consumption:
            </label>
            <input
              type="text"
              id="alcohol"
              value={alcohol}
              onChange={(e) => setAlcohol(e.target.value)}
              placeholder="Enter alcohol consumption (e.g., occasional, moderate, heavy)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="exercise" className="block font-bold mb-2 w-full">
              Exercise:
            </label>
            <input
              type="text"
              id="exercise"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              placeholder="Enter exercise routine (e.g., daily, weekly, none)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor="diet" className="block font-bold mb-2 w-full">
              Diet:
            </label>
            <input
              type="text"
              id="diet"
              value={diet}
              onChange={(e) => setDiet(e.target.value)}
              placeholder="Enter diet (e.g., balanced, vegetarian, vegan)"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Get Diagnosis
          </button>
        </form>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Diagnosis</h2>
            <p>{diagnosis}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeneralScreen;
