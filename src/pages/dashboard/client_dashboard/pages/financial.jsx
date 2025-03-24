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

export default function FinancialHistory() {
  // Mock data for UI demonstration
  const mockBookings = [
    {
      id: 1,
      artisanName: "John Smith",
      serviceDetail: "Plumbing repair in kitchen",
      startDate: "2024-02-15",
      estimateAmount: 500,
      town: "Accra",
      region: "Greater Accra"
    },
    {
      id: 2, 
      artisanName: "Mary Johnson",
      serviceDetail: "Electrical wiring installation",
      startDate: "2024-02-16",
      estimateAmount: 800,
      town: "Kumasi",
      region: "Ashanti"
    }
  ];

  const mockNewBookings = [
    {
      id: 1,
      artisanName: "David Wilson",
      serviceDetail: "Painting living room",
      startDate: "2024-02-20"
    }
  ];

  return (
    <div>
      <h1 className="font-bold text-2xl">Hi John!</h1>
      <Grid container className="flex flex-col md:flex-row">
        {/* Left Side */}
        <Grid item xs={12} md={8} className="p-2">
          <p className="text-sm text-gray-500">
            Here, you'll find everything you need to manage your bookings and appointments with ease. From scheduling your next consultation to tracking the progress of your project, our platform puts you in control every step of the way.
          </p>
          <Box className="flex flex-col h-full">
            {/* Top three black bordered divs */}
            <Box className="flex flex-col md:flex-row justify-between mb-2">
              <Box className="shadow-xl shadow-black-600" sx={{ ...containerStyle, flex: 1, mr: 2 }}>
                <p className="mb-2">Total Appointments</p>
                <p className="mb-2 font-bold">5</p>
                <p className="text-sm text-gray-500">
                  <span className="text-blue-700">Approved</span> appointments
                </p>
              </Box>
              <Box className="shadow-xl shadow-black-600" sx={{ ...containerStyle, flex: 1, mr: 2 }}>
                <p className="mb-2">Completed Appointments</p>
                <p className="mb-2 font-bold">3</p>
                <p className="text-sm text-gray-500">
                  Audited and <span className="text-blue-700">paid</span> services
                </p>
              </Box>
              <Box className="shadow-xl shadow-black-600" sx={{ ...containerStyle, flex: 1, mr: 2 }}>
                <p className="mb-2">Total Amount Paid</p>
                <p className="text-xl text-gray-500">
                  <span className="text-green-500">GHC 1,500.00</span>
                </p>
              </Box>
            </Box>
            {/* Large div taking the rest of the height */}
            <Box className="shadow-xl shadow-black-600 flex-1" sx={containerStyle}>
              <div className='flex flex-row justify-between'>
                <div className='flex flex-col'>
                  <Typography className='text-l font-bold' gutterBottom>
                    Appointments in Progress
                  </Typography>
                  <p className='text-sm text-gray-500 mb-5'>
                    Approved appointments that the artisan is currently working on
                  </p>
                </div>
                <div>
                  <p className='text-blue-600'><Link to={'/client_dashboard/appointments'}>See All</Link></p>
                </div>
              </div>
              {mockBookings.length > 0 ? (
                mockBookings.map((booking) => (
                  <Box key={booking.id} className="p-2 rounded-[10px] border border-gray-300 mb-2">
                    <div className='flex justify-between mb-5'>
                      <div className='flex flex-row'>
                        <p className='font-bold'>{booking.artisanName}</p>
                      </div>
                      <div className='bg-green-300 rounded-[10px] px-4'>
                        <p className='text-green-700'>In Progress</p>
                      </div>
                    </div>
                    <div className='flex flex-row justify-between text-left'>
                      <div>
                        <p className='text-gray-500'>Job Description</p>
                        <p className='font-bold text-sm truncate max-w-full'>{booking.serviceDetail}</p>
                      </div>
                      <div>
                        <p className='text-gray-500'>Expected Date</p>
                        <p className='font-bold text-sm'>{booking.startDate}</p>
                      </div>
                      <div>
                        <p className='text-gray-500'>Total Estimate</p>
                        <p className='font-bold text-sm'>GHC {booking.estimateAmount}.00</p>
                      </div>
                      <div>
                        <p className='text-gray-500'>Location</p>
                        <p className='font-bold text-sm'>{booking.town} {booking.region}</p>
                      </div>
                    </div>
                  </Box>
                ))
              ) : (
                <Box className="flex flex-col items-center justify-center mt-10">
                  <EmptyIcon className='h-20' style={{ color: 'gray' }} />
                  <p className='font-bold text-lg'>You've no pending appointments yet</p>
                  <Typography className="text-gray-500 mt-2 text-center px-2 md:px-20">You're all set! There are currently no pending appointments for you. Enjoy your free time or use it to tackle your next task with peace of mind.</Typography>
                </Box>
              )}
            </Box>
          </Box>
        </Grid>

        {/* Right Side */}
        <Grid item xs={12} md={4} className="flex flex-col p-2">
          <div className='flex flex-row justify-between'>
            <div>
              <Typography className='text-l font-bold' gutterBottom>
                New Appointments
              </Typography>
            </div>
            <div>
              <p className='text-blue-600'><Link to={'/client_dashboard/appointments'}>See All</Link></p>
            </div>
          </div>

          <Typography variant="body1" className='text-gray-500' gutterBottom>
            Latest appointment listing that is yet to be approved. You're either waiting for an estimate from a artisan or you are ready to make payment.
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
