import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon as EmptyIcon } from '@heroicons/react/24/outline';

const containerStyle = {
  backgroundColor: 'white',
  padding: '16px', 
  margin: '8px 0',
  borderRadius: '10px',
};

export default function DashboardDefault() {

  const mockNewBookings = [
    {
      id: 1,
      artisanName: "David Wilson",
      serviceDetail: "Diabetes Appointment Follow-Up",
      startDate: "2025-03-24"
    }
  ];

  return (
    <div>
      <h1 className="font-bold text-xl">Welcome User! Here’s your health summary.</h1>
      <Grid container className="flex flex-col md:flex-row">
        {/* Left Side */}
        <Grid item xs={12} md={8} className="p-2">
          <p className="text-sm text-gray-500">
            Below is a rep/summary
          </p>
          <Box className="flex flex-col h-full">
            {/* Top three black bordered divs */}
            <Box className="flex flex-col md:flex-row justify-between mb-2">
              <Box className="shadow-xl shadow-black-600" sx={{ ...containerStyle, flex: 1, mr: 2 }}>
                <p className="mb-2">Health Score/Status</p>
                <p className="mb-2 text-blue-700 font-bold">89% (good)</p>
                <p className="text-sm text-gray-500">
                  <span className="text-green-700">(+5%)</span> AI-generated overall health rating
                </p>
              </Box>
              <Box className="shadow-xl shadow-black-600" sx={{ ...containerStyle, flex: 1, mr: 2 }}>
                <p className="mb-2">Recent Health Summary</p>
                <p className="mb-2 font-bold">104</p>
                <p className="text-sm text-gray-500">
                  Audited and <span className="text-violet-700">(+5%)</span> Latest AI analysis results
                </p>
              </Box>
              <Box className="shadow-xl shadow-black-600" sx={{ ...containerStyle, flex: 1, mr: 2 }}>
                <p className="mb-2">Latest AI analysis results</p>
                <p className="text-xl text-gray-500"> 
                  <span className="text-green-500">148</span>
                </p>
              </Box>
            </Box>
            {/* Large div taking the rest of the height */}
            <Box className="shadow-xl shadow-black-600 flex-1" sx={containerStyle}>
              <div className='flex flex-row justify-between'>
                <div className='flex flex-col'>
                  <Typography className='text-l font-bold' gutterBottom>
                    Nearby Health Facilities
                  </Typography>
                  <p className='text-sm text-gray-500 mb-5'>
                    Healthcare providers and facilities close to your location
                  </p>
                </div>
                <div>
                  <p className='text-blue-600'><Link to={'/client_dashboard/facilities'}>View All</Link></p>
                </div>
              </div>
              {/* Map container */}
              <div className="w-full h-[400px] rounded-lg mb-4 bg-gray-100">
                {/* Here you would integrate your map component, e.g. Google Maps or Leaflet */}
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-gray-500">Map loading...</p>
                </div>
              </div>
              {/* Facility list */}
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">Ridge Hospital</h3>
                      <p className="text-sm text-gray-500">2.3 km away</p>
                    </div>
                    <div className="bg-green-100 px-3 py-1 rounded-full">
                      <span className="text-green-700 text-sm">Open 24/7</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">Korle Bu Teaching Hospital</h3>
                      <p className="text-sm text-gray-500">3.8 km away</p>
                    </div>
                    <div className="bg-green-100 px-3 py-1 rounded-full">
                      <span className="text-green-700 text-sm">Open 24/7</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">37 Military Hospital</h3>
                      <p className="text-sm text-gray-500">5.1 km away</p>
                    </div>
                    <div className="bg-green-100 px-3 py-1 rounded-full">
                      <span className="text-green-700 text-sm">Open 24/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </Box>
        </Grid>

        {/* Right Side */}
        <Grid item xs={12} md={4} className="flex flex-col p-2">
          <div className='flex flex-row justify-between'>
            <div>
              <Typography className='text-l font-bold' gutterBottom>
                Emergency & Quick Actions (4)
              </Typography>
            </div>
            <div>
              <p className='text-blue-600'><Link to={'/client_dashboard/appointments'}>See All</Link></p>
            </div>
          </div>

          <Typography variant="body1" className='text-gray-500' gutterBottom>
            For urgent medical help
          </Typography>
          {mockNewBookings.length > 0 ? (
            mockNewBookings.map((booking) => (
              <Box key={booking.id} className="mb-2 shadow-xl shadow-black-600" sx={containerStyle}>
                <div className='flex flex-row mb-2'>
                  <p className='text-sm font-semibold'>{booking.artisanName}</p>
                </div>
                <div className='flex flex-col'>
                  <p className='text-gray-500'>Job Description</p>
                  <p className='font-bold text-sm truncate max-w-full'>{booking.serviceDetail}</p>
                </div>
                <div className='flex flex-col mb-2'>
                  <p className='text-gray-500'>Estimated Date</p>
                  <p className='font-bold text-sm'>{booking.startDate}</p>
                </div>
                <div className='bg-gray-300 w-auto text-center rounded p-2'>
                  <p className='text-red-600'>Waiting For Estimate</p>
                </div>
              </Box>
            ))
          ) : (
            <Box className="mb-2 shadow-xl flex flex-col items-center shadow-black-600" sx={containerStyle}>
              <EmptyIcon className='h-20' style={{ color: 'gray' }} />
              <p className='font-bold text-lg'>No new Appointments</p>
              <Typography className="text-gray-500 mt-2 text-center px-2">You're all set! There are currently no new appointments for you. Enjoy your free time or use it to tackle your next task with peace of mind.</Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
