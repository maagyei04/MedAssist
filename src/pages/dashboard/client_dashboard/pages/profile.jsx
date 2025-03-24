import React from "react";
import { Avatar } from '@mui/material';

export default function Profile() {
    return (
        <div className='border border-gray-200 rounded-[10px] p-5 w-auto flex-col shadow shadow-lg bg-white'>
            <h1 className='text-xl font-bold text-left mb-2'>Account Information</h1>

            <label htmlFor="profile-upload" className="font-semibold text-sm text-gray-500">Upload Your Profile Picture</label>
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

            <div>
                <form>
                    <div className='flex flex-col mb-5 w-full shadow shadow-lg'>
                        <label className='mb-2' htmlFor="firstName">First Name</label>
                        <input
                            className='border border-gray-300 rounded-[10px] h-10 p-2'
                            type="text"
                            id="firstName"
                            name="firstName"
                            required
                        />
                    </div>
                    <div className='flex flex-col mb-5 w-full shadow shadow-lg'>
                        <label className='mb-2' htmlFor="lastName">Last Name</label>
                        <input
                            className='border border-gray-300 rounded-[10px] h-10 p-2'
                            type="text"
                            id="lastName"
                            name="lastName"
                            required
                        />
                    </div>
                    <div className='flex flex-col mb-5 w-full shadow shadow-lg'>
                        <label className='mb-2' htmlFor="email">Email Address</label>
                        <input
                            className='border border-gray-300 rounded-[10px] h-10 p-2'
                            type="text"
                            id="email"
                            name="email"
                            required
                        />
                    </div>
                    <div className='flex flex-col mb-5 w-full shadow shadow-lg'>
                        <label className='mb-2' htmlFor="phoneNumber">Phone Number</label>
                        <input
                            className='border border-gray-300 rounded-[10px] h-10 p-2'
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            required
                        />
                    </div>
                    <button
                        className='my-5 w-full btn bg-violet-600 hover:bg-green-600 text-white md:ml-4 font-semibold px-3 py-2 rounded-[10px] duration-500'
                        type="submit"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    );
}
