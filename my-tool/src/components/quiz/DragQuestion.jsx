import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import AnswerFeedback from './AnswerFeedback';
import shuffle from 'lodash.shuffle';

const DragQuestion = ({ question, onNext, onAddToReview }) => {
  const correctAnswers = Array.isArray(question.answer) ? question.answer : [];
  const codeParts = Array.isArray(question.codeParts || question.code_parts)
    ? question.codeParts || question.code_parts
    : [];
  const options = Array.isArray(question.options) ? question.options : [];
  const allOptions = shuffle([...new Set([...correctAnswers, ...options])]);
  const [selected, setSelected] = useState([]);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const inputCount = codeParts.filter((p) => p.input).length;
    setSelected(Array(inputCount).fill(null));
    setHasAnswered(false);
    setIsCorrect(false);
  }, [question]);

  const handleChoiceClick = (choice) => {
    const firstEmpty = selected.findIndex((val) => val === null);
    if (firstEmpty !== -1) {
      const updated = [...selected];
      updated[firstEmpty] = choice;
      setSelected(updated);
    }
  };

  const handleSubmit = () => {
    const correct = correctAnswers.every((ans, i) => selected[i] === ans);
    setIsCorrect(correct);
    setHasAnswered(true);
  };

  const handleTryAgain = () => {
    setSelected(Array(selected.length).fill(null));
    setHasAnswered(false);
    setIsCorrect(false);
  };

  const renderCodeWithInputs = () => {
    let inputIndex = 0;
    return codeParts.map((part, idx) => {
      if (part.input) {
        const value = selected[inputIndex];
        const box = (
          <Box
            key={idx}
            component="span"
            sx={{
              display: 'inline-block',
              minWidth: '60px',
              backgroundColor: '#334',
              color: '#fff',
              mx: '4px',
              px: 1,
              borderBottom: '2px solid #fff',
              textAlign: 'center',
            }}
          >
            {value || ' '}
          </Box>
        );
        inputIndex++;
        return box;
      } else {
        return <span key={idx}>{part.text}</span>;
      }
    });
  };

  let answerIndex = 0;

const correctText = codeParts
  .map((part) => {
    if (part.input) {
      const ans = correctAnswers[answerIndex] ?? '';
      answerIndex++;
      return ans;
    } else {
      return part.text;
    }
  })
  .join('');


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
          fontFamily: 'monospace',
          fontSize: '1rem',
          lineHeight: '1.4',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          maxWidth: '100%',
        }}
      >
        {renderCodeWithInputs()}
      </Box>

      <Box sx={{ mt: 2 }}>
        {allOptions
          .filter((opt) => !selected.includes(opt))
          .map((opt, i) => (
            <Button key={i} variant="outlined" onClick={() => handleChoiceClick(opt)} sx={{ m: 1 }}>
              {opt}
            </Button>
          ))}
      </Box>
      {!hasAnswered && (
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          disabled={selected.includes(null)}
          onClick={handleSubmit}
        >
          Submit Answer
        </Button>
      )}
      {hasAnswered && (
        <AnswerFeedback
          isCorrect={isCorrect}
          correctText={!isCorrect ? `Correct answer:  ${correctText}` : ''}
          onNext={onNext}
          onTryAgain={handleTryAgain}
          onAddToReview={onAddToReview}
        />
      )}
    </Box>
  );
};

export default DragQuestion;
