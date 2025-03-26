import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, Modal } from '@mui/material';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon as EmptyIcon } from '@heroicons/react/24/outline';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const containerStyle = {
  backgroundColor: 'white',
  padding: '16px', 
  margin: '8px 0',
  borderRadius: '10px',
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxHeight: '80vh',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
  borderRadius: '10px'
};

export default function DashboardDefault() {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);
  const [allHospitals, setAllHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [openEmergencyModal, setOpenEmergencyModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const handleOpenEmergencyModal = () => setOpenEmergencyModal(true);
  const handleCloseEmergencyModal = () => setOpenEmergencyModal(false);

  const mockNewBookings = [
    {
      id: 1,
      artisanName: "David Wilson",
      serviceDetail: "Diabetes Appointment Follow-Up",
      startDate: "2025-03-24"
    }
  ];

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          
          try {
            const radius = 5000; // 5km radius
            const query = `
              [out:json][timeout:25];
              (
                node["amenity"="hospital"](around:${radius},${latitude},${longitude});
                way["amenity"="hospital"](around:${radius},${latitude},${longitude});
                relation["amenity"="hospital"](around:${radius},${latitude},${longitude});
              );
              out body;
              >;
              out skel qt;
            `;
            
            const response = await fetch(`https://overpass-api.de/api/interpreter`, {
              method: 'POST',
              body: query
            });
            
            const data = await response.json();
            
            const hospitals = data.elements
              .filter(element => element.tags && element.tags.name)
              .map(element => ({
                name: element.tags.name,
                position: [element.lat, element.lon],
                distance: `${((getDistance([latitude, longitude], [element.lat, element.lon])) / 1000).toFixed(1)} km`
              }));

            setAllHospitals(hospitals);
            setNearbyHospitals(hospitals.slice(0, 5)); // Get only first 5 hospitals
          } catch (error) {
            console.error("Error fetching nearby hospitals:", error);
          }
          
          setLoading(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLoading(false);
        }
      );
    }
  }, []);

  // Function to calculate distance between two points
  function getDistance(point1, point2) {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = point1[0] * Math.PI/180;
    const φ2 = point2[0] * Math.PI/180;
    const Δφ = (point2[0]-point1[0]) * Math.PI/180;
    const Δλ = (point2[1]-point1[1]) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  }

  return (
    <div>
      <h1 className="font-bold text-xl">Welcome User! Here's your health summary.</h1>
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
                  <p className='text-blue-600 cursor-pointer' onClick={handleOpenModal}>View All</p>
                </div>
              </div>
              {/* Map container */}
              <div className="w-full h-[400px] rounded-lg mb-4">
                {userLocation && (
                  <MapContainer 
                    center={userLocation} 
                    zoom={13} 
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {/* User's location marker */}
                    {userLocation && (
                      <Marker position={userLocation}>
                        <Popup>
                          <b>Your Location</b>
                        </Popup>
                      </Marker>
                    )}
                    {/* Hospital markers */}
                    {nearbyHospitals.map((hospital, index) => (
                      <Marker 
                        key={index}
                        position={hospital.position}
                      >
                        <Popup>
                          <b>{hospital.name}</b><br/>
                          {hospital.distance} away
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                )}
                {loading && <div className="flex justify-center items-center h-full">Loading map...</div>}
              </div>
              {/* Facility list */}
              <div className="space-y-3">
                {nearbyHospitals.map((hospital, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold">{hospital.name}</h3>
                        <p className="text-sm text-gray-500">{hospital.distance} away</p>
                      </div>
                      <div className="bg-green-100 px-3 py-1 rounded-full">
                        <span className="text-green-700 text-sm">Open 24/7</span>
                      </div>
                    </div>
                  </div>
                ))}
                {loading && <div className="text-center p-4">Loading nearby facilities...</div>}
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
              <p className='text-blue-600 cursor-pointer' onClick={handleOpenEmergencyModal}>View All</p>
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

      {/* Modal for All Facilities */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="all-facilities-modal"
        aria-describedby="shows-all-nearby-facilities"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" className="mb-4">
            All Nearby Health Facilities
          </Typography>
          <div className="space-y-3">
            {allHospitals.map((hospital, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{hospital.name}</h3>
                    <p className="text-sm text-gray-500">{hospital.distance} away</p>
                  </div>
                  <div className="bg-green-100 px-3 py-1 rounded-full">
                    <span className="text-green-700 text-sm">Open 24/7</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Box>
      </Modal>

      {/* Modal for All Emergency & Quick Actions */}
      <Modal
        open={openEmergencyModal}
        onClose={handleCloseEmergencyModal}
        aria-labelledby="all-emergency-modal"
        aria-describedby="shows-all-emergency-actions"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" className="mb-4">
            All Emergency & Quick Actions
          </Typography>
          <div className="space-y-3">
            {mockNewBookings.map((booking) => (
              <Box key={booking.id} className="p-3 border rounded-lg">
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
            ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
