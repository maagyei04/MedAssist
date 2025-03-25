import React, { useState } from "react";
import { Avatar } from '@mui/material';
import { motion } from 'framer-motion';

export default function Profile() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: '',
        bloodType: '',
        allergies: '',
        chronicConditions: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='border border-gray-200 rounded-[10px] p-5 w-auto flex-col shadow-lg bg-white'
        >
            <h1 className='text-2xl font-bold text-left mb-4'>Medical Profile</h1>

            <div className="mb-6">
                <label htmlFor="profile-upload" className="font-semibold text-sm text-gray-500 block mb-2">Profile Picture</label>
                <label>
                    <div className='relative overflow-hidden cursor-pointer'>
                        <Avatar className="h-[150px] w-[150px]" />
                        <input
                            name='profile-upload'
                            type="file"
                            id="profile-upload"
                            className="hidden"
                            accept="image/*"
                        />
                    </div>
                </label>
            </div>

            <div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className='flex flex-col mb-4'>
                            <label className='mb-2 font-semibold' htmlFor="firstName">First Name</label>
                            <input
                                className='border border-gray-300 rounded-[10px] h-10 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='flex flex-col mb-4'>
                            <label className='mb-2 font-semibold' htmlFor="lastName">Last Name</label>
                            <input
                                className='border border-gray-300 rounded-[10px] h-10 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='flex flex-col mb-4'>
                            <label className='mb-2 font-semibold' htmlFor="email">Email Address</label>
                            <input
                                className='border border-gray-300 rounded-[10px] h-10 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='flex flex-col mb-4'>
                            <label className='mb-2 font-semibold' htmlFor="phoneNumber">Phone Number</label>
                            <input
                                className='border border-gray-300 rounded-[10px] h-10 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='flex flex-col mb-4'>
                            <label className='mb-2 font-semibold' htmlFor="dateOfBirth">Date of Birth</label>
                            <input
                                className='border border-gray-300 rounded-[10px] h-10 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='flex flex-col mb-4'>
                            <label className='mb-2 font-semibold' htmlFor="gender">Gender</label>
                            <select
                                className='border border-gray-300 rounded-[10px] h-10 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                id="gender"
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className='flex flex-col mb-4'>
                            <label className='mb-2 font-semibold' htmlFor="bloodType">Blood Type</label>
                            <select
                                className='border border-gray-300 rounded-[10px] h-10 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                id="bloodType"
                                name="bloodType"
                                value={formData.bloodType}
                                onChange={handleChange}
                            >
                                <option value="">Select Blood Type</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex flex-col mb-4'>
                        <label className='mb-2 font-semibold' htmlFor="allergies">Known Allergies</label>
                        <textarea
                            className='border border-gray-300 rounded-[10px] p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            id="allergies"
                            name="allergies"
                            value={formData.allergies}
                            onChange={handleChange}
                            rows="3"
                            placeholder="List any known allergies..."
                        />
                    </div>

                    <div className='flex flex-col mb-4'>
                        <label className='mb-2 font-semibold' htmlFor="chronicConditions">Chronic Conditions</label>
                        <textarea
                            className='border border-gray-300 rounded-[10px] p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                            id="chronicConditions"
                            name="chronicConditions"
                            value={formData.chronicConditions}
                            onChange={handleChange}
                            rows="3"
                            placeholder="List any chronic conditions..."
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className='mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-[10px] transition-colors duration-300'
                        type="submit"
                    >
                        Update Medical Profile
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
}
