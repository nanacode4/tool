import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, TextField, Button, Paper, Grid, Select, MenuItem, IconButton, FormControl } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

const SingleQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/quiz/${id}/`)
      .then((res) => setQuiz(res.data))
      .catch((err) => console.error('Failed to load quiz:', err));
  }, [id]);

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

  const handleSave = async () => {
    const payload = { kind: quiz.kind, data: quiz.data };
    try {
      await axios.put(`http://localhost:8000/api/quiz/${id}/`, payload);
      navigate('/quizzes');
    } catch (err) {
      console.error('Error saving quiz:', err);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/quiz/${id}/`);
      navigate('/quizzes');
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

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
      <Button onClick={() => handleAddItem(field)} variant="contained" color="primary" size="small" sx={{ mt: 2 }} startIcon={<Add />}>
        Add
      </Button>
    </Box>
  );

  const renderFillCodePartsField = () => (
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
            <Select
              value={item.input ? 'true' : 'false'}
              onChange={(e) => {
                const updated = [...quiz.data.code_parts];
                updated[idx].input = e.target.value === 'true';
                handleChange('code_parts', updated);
              }}
              fullWidth
            >
              <MenuItem value="false">Text</MenuItem>
              <MenuItem value="true">Input</MenuItem>
            </Select>
          </Grid>
          <Grid item>
            <IconButton onClick={() => handleRemoveItem('code_parts', idx)}>
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button
        onClick={() => handleChange('code_parts', [...quiz.data.code_parts, { text: '', input: false }])}
        variant="contained" 
        color="primary"
        size="small"
        startIcon={<Add />}
      >
      Add 
      </Button>
    </Box>
  );

  const renderDragCodePartsField = () => (
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
            <Select
              value={item.input ? 'true' : 'false'}
              onChange={(e) => {
                const updated = [...quiz.data.code_parts];
                updated[idx].input = e.target.value === 'true';
                handleChange('code_parts', updated);
              }}
              fullWidth
            >
              <MenuItem value="false">Text</MenuItem>
              <MenuItem value="true">Input</MenuItem>
            </Select>
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
          handleChange('code_parts', [...quiz.data.code_parts, { text: '', input: true }])
        }
        variant="contained" 
        color="primary"
        size="small"
        startIcon={<Add />}
      >
        Add
      </Button>
    </Box>
  );
  
  if (!quiz) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {`Quiz ${id}`}
      </Typography>

      <Paper sx={{ p: 3 }}>
        {/* Kind & Category */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Kind
            </Typography>
            <TextField value={quiz.kind}  fullWidth />
          </Grid>

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

        {/* Conditional fields */}
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
          {quiz.kind === 'fill' && renderFillCodePartsField()}
          {quiz.kind === 'drag' && renderDragCodePartsField()}
            {/* {(quiz.kind === 'fill' || quiz.kind === 'drag') && renderCodePartsField()} */}
            {renderArrayField('Answer', 'answer')}
          </>
        )}

        {quiz.kind === 'drag' && renderArrayField('Options', 'options')}

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default SingleQuiz;
