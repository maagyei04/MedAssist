import React from 'react';

function DoctorInfo({ source, name, age, hospital, speciality, oncontact }) {
    return (
        <div className="flex items-center bg-white rounded-lg shadow-md p-4">
            <div className="w-24 h-24 rounded-full overflow-hidden mr-4">
                <img src={source} alt="Doctor" className="w-full h-full object-cover" />
            </div>
            <div>
                <h3 className="text-lg font-semibold mb-1">{name}</h3>
                <p className="text-gray-600 mb-1"><strong>Age:</strong> {age}</p>
                <p className="text-gray-600 mb-1"><strong>Field:</strong> {speciality}</p>
                <p className="text-gray-600 mb-2"><strong>Clinic:</strong> {hospital}</p>
                <button
                    onClick={oncontact}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
                    style={{ height: '40px' }}
                >
                    Contact
                </button>
            </div>
        </div>
    );
}

export default DoctorInfo;
