import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Chip, Stack, Paper } from '@mui/material';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';

const AskQuestion = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState([]);
  const username = localStorage.getItem('username') || 'Anonymous';
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput('');
    }
  };

  const handleSubmit = () => {
    if (!title || !description) {
      setErrorMsg('Title and description are required.');
      return;
    }
  
    fetch('http://localhost:8000/api/discuss/create/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        tags,
        username,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setSuccessMsg('Your question has been posted!');
          setErrorMsg('');
          setTitle('');
          setDescription('');
          setTags([]);
        } else {
          setErrorMsg('Failed to post question.');
          setSuccessMsg('');
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg('Something went wrong.');
        setSuccessMsg('');
      });
  };
  

  return (
    <>
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
    {successMsg && (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          sx={{ mb: 2 }}
          onClose={() => setSuccessMsg('')}
        >
          {successMsg}
        </Alert>
      )}
      
      {errorMsg && (
        <Alert
          icon={<ErrorIcon fontSize="inherit" />}
          severity="error"
          sx={{ mb: 2 }}
          onClose={() => setErrorMsg('')}
        >
          {errorMsg}
        </Alert>
      )}
      </Box>
      
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Ask a Question
        </Typography>

        {/* Title */}
        <TextField label="Title" fullWidth variant="outlined" margin="normal" value={title} onChange={(e) => setTitle(e.target.value)} />

        {/* Description */}
        <TextField
          label="Describe your question"
          fullWidth
          multiline
          rows={5}
          variant="outlined"
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Tags */}
        <TextField
          label="Add tag"
          fullWidth
          variant="outlined"
          margin="normal"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
          helperText="Press Enter to add tag"
        />

        {/* Display Tags */}
        <Stack direction="row" spacing={1} mt={1} mb={2} flexWrap="wrap">
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => {
                setTags(tags.filter((t) => t !== tag));
              }}
            />
          ))}
        </Stack>

        {/* Submit */}
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Post Question
        </Button>
      </Paper>
    </Box>
    </>
  );
};

export default AskQuestion;
