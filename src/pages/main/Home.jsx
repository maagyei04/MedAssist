import React, { useEffect, useState } from 'react'
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material'
import { styled } from '@mui/material/styles'
import SmartToyIcon from '@mui/icons-material/SmartToy'
import DescriptionIcon from '@mui/icons-material/Description'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import ExpertTeam from '../../components/common/ExpertTeam'
import AuthModal from '../../components/common/AuthModal'
import {Typewriter} from 'react-simple-typewriter'

const AnimatedBackground = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '200%',
  height: '200%',
  zIndex: -1,
  background: `linear-gradient(
    75deg,
    white 0%, 
    green 25%,
    white 50%,
    red 75%,
    white 100%
  )`,
  opacity: 0.1,
  transformOrigin: 'right center',
  transition: 'transform 0.5s ease-out',
}))

const StyledCard = styled(Card)(({}) => ({
  height: '100%',
  borderRadius: '25px',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
  },
}))

const Home = () => {

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const background = document.querySelector('.animated-background')
          if (background) {
            const scrolled = window.pageYOffset
            const rotation = (scrolled * 0.1) % 360
            const scale = 1 + (scrolled * 0.001)
            
            background.style.transform = `
              rotate(${rotation}deg)
              scale(${scale})
            `
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const features = [
    {
      title: 'AI Medical Records Analysis',
      description: 'Advanced AI algorithms analyze your medical records to provide comprehensive health insights and personalized recommendations.',
      icon: <DescriptionIcon sx={{ fontSize: 60, color: 'primary.main' }} />
    },
    {
      title: 'Intelligent Health Chatbot',
      description: 'Get instant answers to your health queries with our AI-powered chatbot, available 24/7 for your convenience.',
      icon: <SmartToyIcon sx={{ fontSize: 60, color: 'primary.main' }} />
    },
    {
      title: 'Symptom-Based Disease Prediction',
      description: 'Our sophisticated AI model helps predict potential health conditions based on your symptoms with high accuracy.',
      icon: <LocalHospitalIcon sx={{ fontSize: 60, color: 'primary.main' }} />
    }
  ]

  return (
 <Box sx={{ flexGrow: 1, py: 8, position: 'relative', overflow: 'hidden' }}>
      <AnimatedBackground className="animated-background" />
      <Container maxWidth="lg">
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            fontSize: { xs: '1.4rem', md: '2.5rem' },
            fontWeight: 800,
            mb: 6,
            position: 'relative',         
          }}
        >
          From <span style={{color: '#04387CFF'}}>symptoms →</span>{' '}
          <span style={{display: 'inline-block', minWidth: '400px'}}>
            <Typewriter 
              words={['Intelligent Health Chatbot', 'Disease Prediction', 'Medical Report Analysis']} 
              loop={0} 
              cursor 
              cursorStyle='|' 
              cursorColor='red'
              typeSpeed={90} 
              deleteSpeed={70} 
              delaySpeed={1000}
            />
          </span>, we guide you<br /> to Better <span style={{color: '#BF0A30'}}>Health</span>
        </Typography>
        
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 2, fontSize: { xs: '1.2rem', md: '1.5rem' }, }}
        >
          Experience the future of healthcare with our cutting-edge AI technology,
          delivering personalized medical insights and care recommendations.
        </Typography>

        {/* Free Consult Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
          <button onClick={() => setIsAuthModalOpen(true)} className="hidden lg:block bg-[#04387CFF] hover:bg-[#04387CDE] text-white text-sm px-12 py-2 rounded-3xl transition-colors">
            Try MedAssist
          </button>
        </Box>

        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />

        {/* Image grid section */}
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8 h-[600px] relative">
  {/* First column - hidden on mobile */}
  <div className="hidden md:flex md:col-span-1 items-center">
    <div className="w-full h-[300px] rounded-lg overflow-hidden">
      <img
        src={require("../../assets/images/m1.png")}
        alt="Medical consultation"
        className="w-full h-full object-cover"
      />
    </div>
  </div>

  {/* Second column - shown on mobile */}
  <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
    <div className="h-[250px] rounded-lg overflow-hidden">
      <img
        src={require("../../assets/images/m6.jpg")}
        alt="Healthcare technology"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="h-[250px] rounded-lg overflow-hidden">
      <img
        src={require("../../assets/images/m5.png")}
        alt="Medical care"
        className="w-full h-full object-cover"
      />
    </div>
  </div>

  {/* Center column - shown on mobile */}
  <div className="hidden md:flex col-span-1 md:col-span-1">
    <div className="h-[500px] rounded-lg overflow-hidden">
      <img
        src={require("../../assets/images/m3.jpg")}
        alt="Medical equipment"
        className="w-full h-full object-cover"
      />
    </div>
  </div>

  {/* Fourth column - hidden on mobile */}
  <div className="hidden md:flex md:col-span-1 flex-col gap-4">
    <div className="h-[250px] rounded-lg overflow-hidden">
      <img
        src={require("../../assets/images/doc.jpg")}
        alt="Patient care"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="h-[250px] rounded-lg overflow-hidden">
      <img
        src={require("../../assets/images/m7.jpg")}
        alt="Healthcare services"
        className="w-full h-full object-cover"
      />
    </div>
  </div>

  {/* Fifth column - hidden on mobile */}
  <div className="hidden md:flex md:col-span-1 items-center">
    <div className="w-full h-[300px] rounded-lg overflow-hidden">
      <img
        src={require("../../assets/images/m2.png")}
        alt="Medical innovation"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
</div>

{/* Chatbot area */}
 <div className="container mx-auto px-4 py-12 md:py-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left side - Image and Stats */}
        <div className="relative w-full md:w-1/2">
          {/* Main Robot Image */}
          <div className="relative">
            <video
              src={require("../../assets/videos/bot.mp4")}
              alt="AI Healthcare Assistant"
              className="w-full h-auto max-w-[500px] mx-auto"
              autoPlay
              loop
              muted  
              playsInline
            />
            
            {/* Floating Stats Box - Left */}
            <div className="absolute left-0 top-1/4 bg-white rounded-lg p-4 shadow-lg">
              <img
                src={require("../../assets/images/accuracy.png")}
                alt="AI Healthcare Assistant"
                className="w-[100px] h-[60px] md:w-[140px] md:h-[90px] max-w-[160px] mx-auto"
              />
            </div>

            {/* Floating Info Box - Right */}
            <div className="absolute right-0 top-1/2 bg-white rounded-lg p-4 shadow-lg">
              <img
                src={require("../../assets/images/power.png")}
                alt="AI Healthcare Assistant"
                className="w-[100px] h-[60px] md:w-[140px] md:h-[90px] max-w-[160px] mx-auto"
              />
            </div>
          </div>
        </div>
          {/* Right side - Content */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-red-600">
            Healthcare, Simplified!
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900">
            Get instant AI-Powered Assistance
          </h2>
          
          <p className="text-gray-600 text-lg">
            MedAssist - Get instant AI-Powered healthcare assistance. With advanced AI
            and expert insights, we provide accurate health assessments, personalized
            recommendations, and seamless access to medical resources worldwide. Let
            our AI-driven system handle the complexities so you can focus on your well-being
            with confidence.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-red-600">95%</div>
              <div className="text-sm md:text-base text-gray-600">Accuracy in Health Insights</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-red-600">100+</div>
              <div className="text-sm md:text-base text-gray-600">Conditions Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-red-600">24/7</div>
              <div className="text-sm md:text-base text-gray-600">AI-Powered Assistance</div>
            </div>
          </div>
        </div>
      </div>
    </div>

        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            fontSize: { xs: '1.4rem', md: '2.5rem' },
            fontWeight: 800,
            mt: 6,
            mb: 6,
            position: 'relative',         
          }}
        >
          Features/Products
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <StyledCard>
                <CardContent sx={{ flexGrow: 1, textAlign: 'left', p: 4 }}>
                  <Box sx={{ mb: 3 }}>
                    {React.cloneElement(feature.icon, { sx: { fontSize: 40, color: 'black' } })}
                  </Box>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h6"
                    sx={{ mb: 2, fontWeight: '600' }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        <Typography
          variant="h6"
          align="center"
          paragraph
          sx={{ mb: 2, fontSize: { xs: '1rem', md: '1.2rem' }, fontWeight: 600, paddingTop: 8}}
        >
          Explore Amazing Stories from our Users
        </Typography>

        {/* Free Consult Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
          <button className="bg-[#BF0A30] hover:bg-[#BF0A31D0] text-white text-sm px-12 py-2 rounded-3xl transition-colors">
            Read Success Stories
          </button>
        </Box>

      </Container>
      
        {/* Expert Team Section */}
        <ExpertTeam />
    </Box>
  )
}

export default Home
