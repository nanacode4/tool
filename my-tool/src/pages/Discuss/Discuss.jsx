import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, Stack, Paper, Chip, Avatar } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useNavigate } from 'react-router-dom';

const Discuss = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('recent');
  const [searchTerm, setSearchTerm] = useState('');
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    fetch('http://localhost:8000/api/discuss/all/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => setDiscussions(data));
  }, []);

  const getFilteredAndSortedDiscussions = () => {
    const filtered = discussions.filter((d) => d.title.toLowerCase().includes(searchTerm.toLowerCase()));

    if (filter === 'recent') {
      return filtered.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    } else if (filter === 'popular') {
      return filtered.sort((a, b) => b.likes + b.replies.length - (a.likes + a.replies.length));
    }

    return filtered;
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 3 }}>
      {/* Title */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Q&A Discussions
      </Typography>

      {/* Search + Filter */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField fullWidth size="small" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Button variant="outlined">Search</Button>
      </Box>

      {/* Filter & Ask */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Select size="small" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <MenuItem value="recent">Most Recent</MenuItem>
          <MenuItem value="popular">Most Popular</MenuItem>
        </Select>
        <Button onClick={() => navigate('/ask')} variant="contained" color="primary">
          Ask a question
        </Button>
      </Box>

      {/* Discussion list */}
      <Stack spacing={2}>
        {getFilteredAndSortedDiscussions().map((item, idx) => (
          <Paper key={idx} sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ cursor: 'pointer' }} onClick={() => navigate(`/discuss/${item.id}`)}>
              {item.title}
            </Typography>
            <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
              {item.tags.map((tag, i) => (
                <Chip
                  key={i}
                  label={tag}
                  size="small"
                  sx={{
                    backgroundColor: '#b8b9bd',
                    color: '#6d7180',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                  }}
                />
              ))}
            </Stack>

            <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', fontSize: '0.9rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ThumbUpAltIcon fontSize="small" />
                  <span>{item.likes} Like</span>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <ChatBubbleIcon fontSize="small" />
                  <span>{item.replies.length} Answers</span>
                </Box>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" display="block">
                  Posted{' '}
                  {new Date(item.time).toLocaleString(undefined, {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <Typography variant="caption">{item.username}</Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default Discuss;
