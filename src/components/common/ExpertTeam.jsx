//import { motion } from 'framer-motion';
//import { useEffect, useState } from 'react';

const ExpertTeam = () => {
  // Array of team member positions on the circular path
  const teamMembers = [
    { id: 1, x: '20%', y: '20%', emoji: '👨‍⚕️', count: '20' },
    { id: 2, x: '30%', y: '40%', emoji: '👩‍⚕️', count: '32' },
    { id: 3, x: '50%', y: '70%', emoji: '👨‍⚕️', count: '42' },
    { id: 4, x: '70%', y: '60%', emoji: '👩‍⚕️', count: '41' },
    { id: 5, x: '80%', y: '30%', emoji: '👨‍⚕️', count: '22' },
    { id: 6, x: '85%', y: '50%', emoji: '🗨️', count: '10' },
    { id: 7, x: '90%', y: '70%', emoji: '🎨', count: '' },
  ];

  return (
    <div>
      <img
        src={require("../../assets/images/com.png")}
        alt="Medical equipment"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ExpertTeam;