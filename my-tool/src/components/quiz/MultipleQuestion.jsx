import React, { useEffect, useState } from 'react';
import AnswerFeedback from './AnswerFeedback';
import { Box, Button, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';

const MultipleQuestion = ({ question, onNext, onAddToReview }) => {
  const { options = [], answer = [] } = question;
  const [selected, setSelected] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setSelected('');
    setHasAnswered(false);
    setIsCorrect(false);
  }, [question]);

  const handleSubmit = () => {
    const normalize = (val) =>
      typeof val === 'string'
        ? val.trim()
        : Array.isArray(val)
        ? val[0]?.toString?.().trim() || ''
        : val?.toString?.().trim?.() || '';

    const correct = normalize(selected) === normalize(answer);
    setIsCorrect(correct);
    setHasAnswered(true);
  };

  const handleChange = (event) => {
    setSelected(event.target.value);
  };
  const handleTryAgain = () => {
    setSelected('');
    setHasAnswered(false);
    setIsCorrect(false);
  };

  return (
    <Box mt={2}>
      <Typography variant="subtitle1" gutterBottom>
        {question.question}
      </Typography>

      <RadioGroup value={selected} onChange={handleChange}>
        {options.map((opt, index) => (
          <FormControlLabel key={index} value={opt} control={<Radio />} label={opt} />
        ))}
      </RadioGroup>

      {!hasAnswered && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!selected}
          sx={{ mt: 2 }}
        >
          Submit Answer
        </Button>
      )}

      {hasAnswered && (
        <AnswerFeedback
          isCorrect={isCorrect}
          correctText={!isCorrect ? `Correct answer: ${answer[0]}` : ''}
          onNext={onNext}
          onTryAgain={handleTryAgain}
          onAddToReview={onAddToReview}
        />
      )}
    </Box>
  );
};

export default MultipleQuestion;
