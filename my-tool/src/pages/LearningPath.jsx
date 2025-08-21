import React, { useState } from 'react';
import { Container, Typography, Paper, Button, Radio, RadioGroup, FormControl, FormControlLabel, Box } from '@mui/material';

const LearningPath = () => {
  const [answers, setAnswers] = useState({
    experience: '',
    programming: '',
    algorithms: '',
    interest: '',
  });

  const [recommendations, setRecommendations] = useState(null);

  const handleChange = (event) => {
    setAnswers({ ...answers, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    const response = await fetch('http://127.0.0.1:8000/api/learning-path/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers),
    });

    const result = await response.json();
    console.log(result); 
    setRecommendations(result);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Personalized Learning Path
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">1. Do you have programming experience?</Typography>
        <FormControl component="fieldset">
          <RadioGroup name="experience" value={answers.experience} onChange={handleChange}>
            <FormControlLabel value="no" control={<Radio />} label="No experience" />
            <FormControlLabel value="basic" control={<Radio />} label="Basic understanding" />
            <FormControlLabel value="good" control={<Radio />} label="Proficient in at least one language" />
          </RadioGroup>
        </FormControl>

        <Typography variant="h6" sx={{ mt: 3 }}>
          2. Can you complete basic tasks (like Python basics)?
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup name="programming" value={answers.programming} onChange={handleChange}>
            <FormControlLabel value="no" control={<Radio />} label="No, I need help with basics" />
            <FormControlLabel value="yes" control={<Radio />} label="Yes, I can write simple programs" />
          </RadioGroup>
        </FormControl>

        <Typography variant="h6" sx={{ mt: 3 }}>
          3. Are you familiar with data structures and algorithms?
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup name="algorithms" value={answers.algorithms} onChange={handleChange}>
            <FormControlLabel value="no" control={<Radio />} label="Not at all" />
            <FormControlLabel value="some" control={<Radio />} label="Basic understanding (sorting, searching)" />
            <FormControlLabel value="advanced" control={<Radio />} label="Advanced knowledge (dynamic programming, graphs)" />
          </RadioGroup>
        </FormControl>

        <Typography variant="h6" sx={{ mt: 3 }}>
          4. Are you interested in a specific field?
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup name="interest" value={answers.interest} onChange={handleChange}>
            <FormControlLabel value="web" control={<Radio />} label="Web Development" />
            <FormControlLabel value="ai" control={<Radio />} label="AI & Machine Learning" />
            <FormControlLabel value="system" control={<Radio />} label="System Design & Architecture" />
            <FormControlLabel value="none" control={<Radio />} label="Not sure yet" />
          </RadioGroup>
        </FormControl>
      </Paper>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Get My Learning Path
        </Button>
      </Box>

      {recommendations && (
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h5">Recommended Learning Path</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {recommendations.path}
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default LearningPath;
