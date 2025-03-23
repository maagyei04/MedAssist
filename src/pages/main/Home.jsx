import { Box, Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import DescriptionIcon from '@mui/icons-material/Description';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
  },
}));

const Home = () => {
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
  ];

  return (
    <Box sx={{ flexGrow: 1, py: 8 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          align="center"
          gutterBottom
          sx={{
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            fontWeight: 700,
            mb: 6
          }}
        >
          AI-Powered Healthcare Solutions
        </Typography>
        
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 8 }}
        >
          Experience the future of healthcare with our cutting-edge AI technology,
          delivering personalized medical insights and care recommendations.
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <StyledCard>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 4 }}>
                  <Box sx={{ mb: 3 }}>
                    {feature.icon}
                  </Box>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    sx={{ mb: 2 }}
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
      </Container>
    </Box>
  );
};

export default Home;
