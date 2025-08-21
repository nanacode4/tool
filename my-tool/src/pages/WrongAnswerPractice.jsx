import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import axios from 'axios';

const WrongAnswerPractice = () => {
  const [questions, setQuestions] = useState([]);
  const [statuses, setStatuses] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const res = await axios.get('http://localhost:8000/api/quiz/get_wrong_answers/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const normalized = res.data.map((item) => ({
          id: item.quiz.id,
          question: item.quiz.data.question,
          options: item.quiz.data.options,
          answer: item.quiz.data.answer,
        }));
        setQuestions(normalized);
      } catch (err) {
        console.error('Failed to fetch wrong answers:', err);
      }
    };

    fetchQuestions();
  }, []);

  const handleSubmit = (id) => {
    const question = questions.find((q) => q.id === id);
    const selectedOption = selectedOptions[id];
    if (!selectedOption) return;
    const isCorrect = question.answer.includes(selectedOption);
    setStatuses((prev) => ({
      ...prev,
      [id]: { hasAnswered: true, isCorrect },
    }));
  };

  const handleOptionChange = (id, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleRemoveFromWrongAnswers = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.delete(`http://localhost:8000/api/quiz/wrong_answers/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions((prev) => prev.filter((q) => q.id !== id));
    } catch (err) {
      console.error('Failed to remove wrong answer:', err);
    }
  };

  return (
    <Box mt={4} mr={4} ml={6}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Practice Your Wrong Answers
      </Typography>

      {questions.length > 0 ? (
        questions.map((question) => {
          const status = statuses[question.id] || { hasAnswered: false, isCorrect: null };
          return (
            <Box key={question.id} sx={{ mb: 6 }}>
              <Typography variant="h6" gutterBottom>
                {question.question}
              </Typography>
              <RadioGroup
                onChange={(e) => handleOptionChange(question.id, e.target.value)}
                name={`question-${question.id}`}
                value={selectedOptions[question.id] || ''}
              >
                {question.options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>

              {!status.hasAnswered && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSubmit(question.id)}
                  disabled={!selectedOptions[question.id]}
                  sx={{ mt: 2 }}
                >
                  Submit
                </Button>
              )}

              {status.hasAnswered && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: status.isCorrect ? 'green' : 'red', fontWeight: 'bold' }}
                  >
                    {status.isCorrect ? 'Correct Answer!' : 'Wrong Answer!'}
                  </Typography>

                  {status.isCorrect ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleRemoveFromWrongAnswers(question.id)}
                      sx={{ mt: 1 }}
                    >
                      REMOVE 
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setStatuses((prev) => ({
                        ...prev,
                        [question.id]: { hasAnswered: false, isCorrect: null },
                      }))}
                      sx={{ mt: 1 }}
                    >
                      TRY AGAIN
                    </Button>
                  )}
                </Box>
              )}
            </Box>
          );
        })
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
};

export default WrongAnswerPractice;
