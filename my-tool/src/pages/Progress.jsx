import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Grid, Button, Box, Typography, Paper, Avatar, LinearProgress, Stack } from '@mui/material';
import userAvatar from './../assets/images/user.jpeg';

const Progress = () => {
  const username = localStorage.getItem('username');
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const userCourses = data.filter((item) => {
    const itemUsername = item.username || (item.user && item.user.username);
    return itemUsername === username;
  });
  const [progress, setProgress] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token || !username) {
      navigate('/login');
    }
  }, [username, navigate]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    fetch('http://127.0.0.1:8000/api/learning-path/user_progress/summary/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProgress(data);
      })
      .catch((error) => {
        console.error('Error fetching progress:', error);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    fetch('http://127.0.0.1:8000/api/quiz/get_wrong_answers/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setWrongAnswers(data))
      .catch((err) => console.error('Error fetching wrong answers', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/api/feedback/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        content: feedback,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setSubmitted(true);
          setFeedback('');
        }
      })
      .catch((error) => console.error('Error submitting feedback:', error));
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <>
      <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
        {/* User avatar and name */}
        <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', mb: 4, position: 'relative' }}>
          <Avatar src={userAvatar} sx={{ width: 100, height: 100, mr: 3 }} />
          <Box>
            <Typography variant="h4" fontWeight="bold">
              {username}
            </Typography>
            <Typography variant="h6">{username}@gmail.com</Typography>
            <Typography variant="h6">Student at University of Galway~</Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ position: 'absolute', top: 56, right: 36 }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Paper>

        {/* Course Progress */}
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Course Progress
              </Typography>
              <Stack spacing={3}>
                {progress && (
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {progress.course}
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={progress.percentage}
                      sx={{
                        height: 10,
                        borderRadius: 5,
                        mt: 1,
                        backgroundColor: '#e0e0e0',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: '#373d38',
                        },
                      }}
                    />
                    <Typography variant="body2" align="right" mt={0.5}>
                      {progress.percentage}%
                    </Typography>
                  </Box>
                )}
              </Stack>
              <Box sx={{ display: 'flex', justifyContent: 'left', mt: 2, mb: 2 }}>
                <Button variant="contained" color="primary" onClick={() => navigate('/dashboard')}>
                  Browse Courses
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Quiz part */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, mt: 3 }}>
              <Typography variant="h5" gutterBottom>
                Quiz Review
              </Typography>
              {wrongAnswers.length > 0 ? (
                <>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    You have {wrongAnswers.length} wrong quizzes to practice.
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => navigate('/wrong-practice')}
                  >
                    Practice
                  </Button>
                </>
              ) : (
                <>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    No wrong quizzes yet.
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate('/dashboard')}
                  >
                    Go to Dashboard
                  </Button>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* feedback part */}
        <Grid container spacing={1} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Feedback
              </Typography>
              {/* <Typography variant="h6">
                Got any suggestions or encountered a bug? Let us know!
              </Typography> */}
              <Box component="form" onSubmit={handleSubmit}>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    marginBottom: '10px',
                    fontFamily: 'inherit',
                    fontSize: '1rem',
                  }}
                  placeholder="Enter your feedback here..."
                  required
                />
                <Button variant="contained" color="primary" type="submit">
                  Submit Feedback
                </Button>
              </Box>
              {submitted && (
                <Typography variant="body2" color="success.main" mt={2}>
                  Thank you for your feedback!
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Progress;
