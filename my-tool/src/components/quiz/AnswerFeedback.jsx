import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';

const AnswerFeedback = ({ isCorrect, correctText, onNext, onTryAgain, onAddToReview }) => {
  return (
    <Box sx={{ mt: 3 }}>
      {/* Correct / Wrong Text */}
      <Typography
        variant="h5"
        sx={{
          color: isCorrect ? 'black' : 'red',
          fontWeight: 'bold',
          mb: 2,
        }}
      >
        {isCorrect ? 'Correct Answer!' : 'Wrong Answer!'}
      </Typography>

      {/* Correct answer explanation if wrong */}
      {!isCorrect && correctText && (
        <Typography
          variant="h5"
          sx={{
            color: 'text.secondary',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
            mb: 2,
          }}
        >
          {correctText}
        </Typography>
      )}

      {/* Buttons */}
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={isCorrect ? onNext : onTryAgain}
        >
          {isCorrect ? 'Next Question' : 'Try Again'}
        </Button>

        {/* Only show "Add to Review" if answer is wrong */}
        {!isCorrect && onAddToReview && (
          <Button variant="outlined" color="secondary" onClick={onAddToReview}>
            Add to Review
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default AnswerFeedback;
