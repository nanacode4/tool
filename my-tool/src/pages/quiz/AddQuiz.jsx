import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, TextField, Button, Paper, Grid, IconButton, MenuItem } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { Alert } from '@mui/material';

const getDefaultData = (type) => ({
  category: '',
  question: '',
  answer: type === 'multiple' ? '' : [],
  options: type === 'multiple' || type === 'drag' ? [] : [],
  code_parts: type === 'fill' || type === 'drag' ? [] : [],
});

const AddQuiz = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('multiple');
  const [success, setSuccess] = useState(false);

  const [quiz, setQuiz] = useState({
    kind: selectedType,
    data: getDefaultData(selectedType),
  });

  const handleChange = (field, value) => {
    setQuiz({ ...quiz, data: { ...quiz.data, [field]: value } });
  };

  const handleArrayChange = (field, index, value) => {
    const arr = [...quiz.data[field]];
    arr[index] = value;
    handleChange(field, arr);
  };

  const handleAddItem = (field) => {
    handleChange(field, [...quiz.data[field], '']);
  };

  const handleRemoveItem = (field, index) => {
    const arr = [...quiz.data[field]];
    arr.splice(index, 1);
    handleChange(field, arr);
  };

  const handleSubmit = async () => {
    const { kind, data } = quiz;

    const cleanedAnswer =
      kind === 'multiple'
        ? typeof data.answer === 'string'
          ? data.answer.trim()
          : Array.isArray(data.answer)
          ? data.answer[0]?.trim?.() || ''
          : ''
        : data.answer;

    const convertToCodeParts = (arr) =>
      arr.map((text, index) => ({
        text: text,
        input: index === arr.findIndex((item) => item === ''), 
      }));

    const payload = {
      kind: kind,
      data: {
        category: data.category,
        question: data.question,
        ...(kind === 'multiple' && {
          options: data.options,
          answer: cleanedAnswer,
        }),
        ...(kind === 'fill' && {
          code_parts: data.code_parts,
          answer: cleanedAnswer,
        }),
        ...(kind === 'drag' && {
          code_parts: data.code_parts,
          options: data.options,
          answer: cleanedAnswer,
        }),
      },
    };

    try {
      await axios.post('http://localhost:8000/api/quiz/', payload);
      console.log('Submitting payload:', payload);
      setSuccess(true);
      setTimeout(() => {
        navigate('/quizzes');
      }, 2000);
    } catch (err) {
      console.error('Quiz creation failed:', err);
    }
  };

  const renderCodePartsField = () => (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
      
      </Typography>
      {quiz.data.code_parts.map((item, idx) => (
        <Grid container spacing={1} key={idx} alignItems="center" sx={{ mb: 1 }}>
          <Grid item xs={7}>
            <TextField
              label="Text"
              value={item.text}
              onChange={(e) => {
                const updated = [...quiz.data.code_parts];
                updated[idx].text = e.target.value;
                handleChange('code_parts', updated);
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              select
              label="Type"
              value={item.input ? 'input' : 'text'}
              onChange={(e) => {
                const updated = [...quiz.data.code_parts];
                updated[idx].input = e.target.value === 'input';
                handleChange('code_parts', updated);
              }}
              fullWidth
            >
              <MenuItem value="text">Text</MenuItem>
              <MenuItem value="input">Input</MenuItem>
            </TextField>
          </Grid>
          <Grid item>
            <IconButton onClick={() => handleRemoveItem('code_parts', idx)}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button
        onClick={() =>
          handleChange('code_parts', [...quiz.data.code_parts, { text: '', input: false }])
        }
        variant="outlined"
        color="inherit"
        size="small"
        startIcon={<Add />}
      >
        Add 
      </Button>
    </Box>
  );
  

  const renderArrayField = (label, field) => (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {label}
      </Typography>
      {quiz.data[field].map((item, idx) => (
        <Grid container spacing={1} key={idx} alignItems="center" sx={{ mb: 1 }}>
          <Grid item xs>
            <TextField value={item} onChange={(e) => handleArrayChange(field, idx, e.target.value)} fullWidth />
          </Grid>
          <Grid item>
            <IconButton onClick={() => handleRemoveItem(field, idx)}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button onClick={() => handleAddItem(field)} variant="outlined" color="inherit" size="small" sx={{ mt: 1 }} startIcon={<Add />}>
        Add {label}
      </Button>
    </Box>
  );

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setQuiz({
      kind: type,
      data: getDefaultData(type),
    });
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Quiz submitted successfully!
        </Alert>
      )}

      <Typography variant="h4" gutterBottom>
        Add New Quiz
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Choose Quiz Type
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant={selectedType === 'multiple' ? 'contained' : 'outlined'} onClick={() => handleTypeSelect('multiple')}>
            Multiple
          </Button>
          <Button variant={selectedType === 'fill' ? 'contained' : 'outlined'} onClick={() => handleTypeSelect('fill')}>
            Fill
          </Button>
          <Button variant={selectedType === 'drag' ? 'contained' : 'outlined'} onClick={() => handleTypeSelect('drag')}>
            Drag
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Category
            </Typography>
            <TextField value={quiz.data.category} onChange={(e) => handleChange('category', e.target.value)} fullWidth />
          </Grid>
        </Grid>

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Question
          </Typography>
          <TextField value={quiz.data.question} onChange={(e) => handleChange('question', e.target.value)} fullWidth multiline />
        </Box>

        {quiz.kind === 'multiple' && (
          <>
            {renderArrayField('Options', 'options')}
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Answer
              </Typography>
              <TextField value={quiz.data.answer} onChange={(e) => handleChange('answer', e.target.value)} fullWidth />
            </Box>
          </>
        )}

        {(quiz.kind === 'fill' || quiz.kind === 'drag') && (
          <>
           {renderCodePartsField()}
            {renderArrayField('Answer', 'answer')}
          </>
        )}

        {quiz.kind === 'drag' && renderArrayField('Options', 'options')}

        <Box sx={{ mt: 3 }}>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddQuiz;
