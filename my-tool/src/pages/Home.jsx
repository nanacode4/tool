import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Paper, Grid } from '@mui/material';
import home from './../assets/images/home.png';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Home = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/dashboard');
  };

  const features = [
    {
      title: 'Tailored to you',
      description:
        'No matter your experience level, you will be writing real, functional code within minutes of starting your first course.',
    },
    {
      title: 'Bite-sized',
      description:
        'Go step-by-step through our unique courses. Assess what you have learned with in-lesson quizzes, and gradually advance your skills with practice.',
    },
    {
      title: 'It is promising',
      description: 'Technical skills are in high demand. Start your learning journey today!',
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 6,
          py: 10,
          backgroundColor: '#eee7d0',
          flexWrap: 'wrap',
          // minHeight: '30vh',
        }}
      >
        {/* Left: Text */}
        <Box sx={{ flex: 1, minWidth: 800, pr: 4 }}>
          <Typography variant="h4" fontWeight="500" color="text.secondary" mb={2}>
            Programming tutorials for beginners
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={2}>
            Learn Python, Java and other programming languages ​​through simple tutorials.
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={2}>
            Start your programming journey today!
          </Typography>
          <Button variant="contained" size="large" mb={2} onClick={handleStartClick}>
            Start Now
          </Button>
        </Box>

        {/* Right: Image */}
        <Box sx={{ flex: 1, minWidth: 300, textAlign: 'left' }}>
          <img src={home} style={{ maxWidth: '100%' }} />
        </Box>
      </Box>
{/* 2 */}
      <Box sx={{ py: 8, px: 4, backgroundColor: '#336699' }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        color="text.primary"
        sx={{ mb: 6 }}
      >
        The perfect platform to boost your technical skills
      </Typography>

      <Grid container spacing={4} maxWidth="lg" margin="auto">
        {features.map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Box display="flex" alignItems="flex-start">
              <CheckCircleIcon sx={{ color: '#4ba353', fontSize: 32, mt: 0.5, mr: 2 }} />
              <Box>
                <Typography variant="h6" fontWeight="bold" color="#4ba353" gutterBottom>
                  {item.title}
                </Typography>
                <Typography color="text.secondary">{item.description}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
    </>
  );
};

export default Home;
