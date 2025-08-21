import { Box, Button, Divider } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const topics = [
  { label: 'Python Introduction', path: '/python/intro' },
  { label: 'Python Variables', path: '/python/variables' },
  { label: 'Python Data Types', path: '/python/datatypes' },
  { label: 'Python Numbers', path: '/python/numbers' },
  { label: 'Python Strings', path: '/python/strings' },
  { label: 'Python Booleans', path: '/python/booleans' },
  { label: 'Python Operators', path: '/python/operators' },
  { label: 'Python Lists', path: '/python/lists' },
  { label: 'Python Tuples', path: '/python/tuples' },
  { label: 'Python Sets', path: '/python/sets' },
  { label: 'Python Dictionaries', path: '/python/dictionaries' },
  { label: 'Python If ... Else', path: '/python/ifelse' },
  { label: 'Python While Loops', path: '/python/while' },
  { label: 'Python For Loops', path: '/python/for' },
  { label: 'Python Functions', path: '/python/functions' },
];

const PaginationNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentIndex = topics.findIndex((item) => item.path === location.pathname);

  const prev = topics[currentIndex - 1];
  const next = topics[currentIndex + 1];

  return (
    <Box sx={{ mt: 6 }}>
      <Divider sx={{ mb: 3 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {prev ? (
          <Button
            variant="outlined"
            onClick={() => navigate(prev.path)}
            sx={{ color: '#333', borderColor: '#ccc' }}
          >
            Previous
          </Button>
        ) : <Box />}
        {next ? (
          <Button
            variant="outlined"
            onClick={() => navigate(next.path)}
            sx={{ color: '#333', borderColor: '#ccc' }}
          >
            Next 
          </Button>
        ) : <Box />}
      </Box>
    </Box>
  );
};

export default PaginationNav;
