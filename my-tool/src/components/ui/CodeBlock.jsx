import { Box } from '@mui/material';

const CodeBlock = ({ children }) => {
  return (
    <Box
      component="pre"
      sx={{
        backgroundColor: '#eee',
        p: 2,
        borderRadius: 1,
        fontFamily: 'monospace',
        overflowX: 'auto',
        lineHeight: 1.6,
      }}
    >
      {children}
    </Box>
  );
};

export default CodeBlock;
