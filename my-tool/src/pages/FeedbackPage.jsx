import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Avatar, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/');
      return;
    }

    fetch('http://127.0.0.1:8000/api/feedback/all/')
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((error) => console.error('Error fetching feedback:', error));
  }, [role, navigate]);

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Feedback
      </Typography>

      {feedbacks.length === 0 ? (
        <Typography variant="body1">No feedback submitted yet.</Typography>
      ) : (
        feedbacks.map((fb, index) => (
          <Paper key={index} sx={{ p: 3, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
                {fb.username.charAt(0).toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  {fb.username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Posted {new Date(fb.created_at).toLocaleDateString()} {new Date(fb.created_at).toLocaleTimeString()}
                </Typography>
              </Box>
            </Box>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
              {fb.content}
            </Typography>
          </Paper>
        ))
      )}
    </Box>
  );
};

export default FeedbackPage;
