import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableRow, Paper } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { label: 'Python Introduction', path: 'intro' },
  { label: 'Python Variables', path: 'variables' },
  { label: 'Python Data Types', path: 'datatypes' },
  { label: 'Python Numbers', path: 'numbers' },
  { label: 'Python Strings', path: 'strings' },
  { label: 'Python Booleans', path: 'booleans' },
  { label: 'Python Operators', path: 'operators' },
  { label: 'Python Lists', path: 'lists' },
  { label: 'Python Tuples', path: 'tuples' },
  { label: 'Python Sets', path: 'sets' },
  { label: 'Python Dictionaries', path: 'dictionaries' },
  { label: 'Python If ... Else', path: 'ifelse' },
  { label: 'Python While Loops', path: 'while' },
  { label: 'Python For Loops', path: 'for' },
  { label: 'Python Functions', path: 'functions' },
];

const PythonLearn = () => {
  const [completedTopics, setCompletedTopics] = useState([]);
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();
  axios
    .get('http://localhost:8000/api/learning-path/user_progress/list/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      const topics = res.data.map((item) => item.topic);
      setCompletedTopics(topics);
    })
    .catch((err) => {
      console.error('Failed to fetch completed topics:', err);
    });

  const handleClick = async (topic) => {
    const token = localStorage.getItem('access_token');

    const isCompleted = completedTopics.includes(topic);

    if (isCompleted) {
      setCompletedTopics((prev) => prev.filter((t) => t !== topic));

      try {
        await axios.delete('http://localhost:8000/api/learning-path/user_progress/unmark/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            topic,
            course: 'Python',
          },
        });
      } catch (error) {
        console.error('Failed to unmark topic:', error);
      }
    } else {
      setCompletedTopics((prev) => [...new Set([...prev, topic])]);

      try {
        await axios.post(
          'http://localhost:8000/api/learning-path/user_progress/',
          {
            topic,
            course: 'Python',
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error('Failed to mark topic complete:', error);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', py: 7 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
        Introduction to Python
      </Typography>
      <Paper elevation={2}>
        <Table>
          <TableBody>
            {menuItems.map((item, index) => (
              <TableRow hover key={index}>
              <TableCell sx={{ py: 2 }}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <Box
                    sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => navigate(`/python/${item.path}`)} 
                  >
                    <InsertDriveFileIcon sx={{ color: 'gray', fontSize: 22, mr: 4 }} />
                    <Typography sx={{ fontSize: '1.5rem', fontWeight: 500 }}>
                      {item.label}
                    </Typography>
                  </Box>
                  <CheckCircleIcon
                    sx={{
                      color: completedTopics.includes(item.path) ? 'green' : 'gray',
                      cursor: 'pointer',
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleClick(item.path);
                    }}
                  />
                </Box>
              </TableCell>
            </TableRow>
            
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default PythonLearn;
