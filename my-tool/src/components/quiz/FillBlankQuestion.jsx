import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, TextField } from '@mui/material';
import AnswerFeedback from './AnswerFeedback';

const FillBlankQuestion = ({ question, onNext, onAddToReview }) => {
  const { codeParts = [], answer = [] } = question;
  const [inputs, setInputs] = useState([]);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const inputCount = codeParts.filter((p) => p.input).length;
    setInputs(Array(inputCount).fill(''));
    setHasAnswered(false);
    setIsCorrect(false);
  }, [question]);

  const handleSubmit = () => {
    const correct = answer.every((ans, i) => (inputs[i] || '').trim() === ans.trim());
    setIsCorrect(correct);
    setHasAnswered(true);
  };

  const handleTryAgain = () => {
    setInputs(Array(inputs.length).fill(''));
    setHasAnswered(false);
    setIsCorrect(false);
  };

  let answerIndex = 0;

  const correctText = codeParts
    .map((part) => {
      if (part.input) {
        const ans = answer[answerIndex] ?? '';
        answerIndex++;
        return `[${ans}]`;
      } else {
        return part.text;
      }
    })
    .join('');

  let inputIndex = 0;

  return (
    <Box mt={2}>
      <Typography variant="subtitle1" gutterBottom>
        {question.question}
      </Typography>

      <Box
        component="pre"
        sx={{
          background: '#2e3440',
          color: '#eceff4',
          p: 2,
          borderRadius: 2,
          mt: 1,
          whiteSpace: 'pre-wrap',
          fontFamily: 'monospace',
          fontSize: '1rem',
          lineHeight: '1.4',
          maxWidth: '600px',
        }}
      >
        {codeParts.map((part, index) => {
          if (part.input) {
            const currentIndex = inputIndex;
            inputIndex++;
            return (
              <TextField
                key={index}
                variant="standard"
                value={inputs[currentIndex]}
                onChange={(e) => {
                  const updated = [...inputs];
                  updated[currentIndex] = e.target.value;
                  setInputs(updated);
                }}
                autoComplete="off"
                inputProps={{
                  style: {
                    padding: 0,
                    fontSize: '1rem',
                    fontFamily: 'monospace',
                    color: '#fff',
                  },
                  spellCheck: 'false',
                }}
                sx={{
                  bgcolor: '#2c3e50',
                  borderRadius: '4px',
                  mx: '4px',
                  width: '100px',
                }}
              />
            );
          } else {
            return <span key={index}>{part.text}</span>;
          }
        })}
      </Box>
      {!hasAnswered && (
        <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
          Submit Answer
        </Button>
      )}
      {hasAnswered && (
        <AnswerFeedback
          isCorrect={isCorrect}
          correctText={!isCorrect ? `Correct answer: ${correctText}` : ''}
          onNext={onNext}
          onTryAgain={handleTryAgain}
          onAddToReview={onAddToReview}
        />
      )}
    </Box>
  );
};

export default FillBlankQuestion;
