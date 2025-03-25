import React, { useState } from 'react';
import axios from 'axios';

const DiabetesScreen = () => {
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
      setDiagnosis(response.data.diagnosis);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-8">General Symptom Checker</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="symptoms" className="block font-bold mb-2">
            Symptoms:
          </label>
          <input
            type="text"
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value.split(','))}
            placeholder="Enter symptoms separated by commas"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Add input fields for other patient information */}
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
          />
        </div>
        {/* Add more input fields for other patient information */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Get Diagnosis
        </button>
      </form>
      {diagnosis && (
        <div className="mt-8 p-4 bg-green-100 text-green-700 rounded-md">
          <p>Diagnosis: {diagnosis}</p>
        </div>
      )}
    </div>
  );
};

export default DiabetesScreen;

