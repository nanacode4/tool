import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Paper,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { Typography, TextField, Button, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';

const Quiz = () => {
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const quizzesPerPage = 10;

  // Get All quiz
  useEffect(() => {
    const fetchAllQuizzes = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/quiz/');
        setAllQuizzes(res.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };
    fetchAllQuizzes();
  }, []);

  // Process data based on search and filter
  const filteredQuizzes = allQuizzes
    .filter((q) => q.data?.question?.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((q) => {
      if (filter === 'all') return true;
      return q.kind === filter;
    });

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedQuizzes = filteredQuizzes.slice(
    (page - 1) * quizzesPerPage,
    page * quizzesPerPage
  );

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 5, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        All Quizzes
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {/* Search Input */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search by question..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="outlined" onClick={() => setSearchTerm('')}>
          Search
        </Button>
      </Box>

      {/* Category filter + Add button */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Select size="small" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="multiple">MCQ</MenuItem>
          <MenuItem value="fill">FILL</MenuItem>
          <MenuItem value="drag">DRAG</MenuItem>
        </Select>
        <Button onClick={() => navigate('/admin/quiz/add')} variant="contained" color="primary">
          Add Quiz
        </Button>
      </Box>

      {/* Table display */}
      {filteredQuizzes.length === 0 ? (
        <Typography>No quiz data matched.</Typography>
      ) : (
        <Paper sx={{ overflow: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Question</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Answer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedQuizzes.map((q, index) => (
                <TableRow
                  key={q.id}
                  hover
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/admin/quiz/${q.id}`)}
                >
                  <TableCell>{(page - 1) * quizzesPerPage + index + 1}</TableCell>
                  <TableCell>{q.data?.question}</TableCell>
                  <TableCell>{q.data?.category}</TableCell>
                  <TableCell>{q.kind}</TableCell>
                  <TableCell>
                    {Array.isArray(q.data?.answer) ? q.data.answer.join(', ') : q.data?.answer}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(filteredQuizzes.length / quizzesPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Quiz;
