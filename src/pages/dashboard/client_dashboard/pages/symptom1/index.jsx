import { useState } from 'react';
import GeneralScreen from './general';
import DiabetesScreen from './diabetes';
import BreastCancerScreen from './breastcancer';
import AutismScreen from './autism';

const SymptomChecker = () => {
  const [activeTab, setActiveTab] = useState('general');

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'general':
        return <div className="overflow-y-auto"><GeneralScreen /></div>;
      case 'diabetes':
        return <div className="overflow-y-auto"><DiabetesScreen /></div>;
      case 'breast-cancer':
        return <div className="overflow-y-auto"><BreastCancerScreen /></div>;
      case 'autism':
        return <div className="overflow-y-auto"><AutismScreen /></div>;
      default:
        return null;
    }
  };

  return (
    <div className="fixed left-0 lg:left-80 top-15 right-0 z-50">
      <div className="flex gap-2 mb-8 bg-white p-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('general')}
          className={`px-6 rounded-full text-white transition-colors ${
            activeTab === 'general' 
              ? 'bg-red-600' 
              : 'bg-pink-300 hover:bg-pink-400'
          }`}
        >
          GENERAL
        </button>

        <button
          onClick={() => setActiveTab('diabetes')}
          className={`px-6 rounded-full text-white transition-colors ${
            activeTab === 'diabetes' 
              ? 'bg-red-600' 
              : 'bg-pink-300 hover:bg-pink-400'
          }`}
        >
          DIABETES
        </button>

        <button
          onClick={() => setActiveTab('breast-cancer')}
          className={`px-6 rounded-full text-white transition-colors ${
            activeTab === 'breast-cancer' 
              ? 'bg-red-600' 
              : 'bg-pink-300 hover:bg-pink-400'
          }`}
        >
          BREAST CANCER
        </button>

        <button
          onClick={() => setActiveTab('autism')}
          className={`px-6 lg:px-4 lg:py-2 rounded-full text-white transition-colors ${
            activeTab === 'autism' 
              ? 'bg-red-600' 
              : 'bg-pink-300 hover:bg-pink-400'
          }`}
        >
          AUTISM
        </button>
      </div>

      <div className="overflow-y-auto">
        {renderActiveScreen()}
      </div>
    </div>
  );
};

export default SymptomChecker;