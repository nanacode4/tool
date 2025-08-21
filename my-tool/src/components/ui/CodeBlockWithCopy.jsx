import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeBlockWithCopy = ({ language, value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Box sx={{ position: 'relative', mb: 2 }}>
      <Box sx={{ fontSize: 12, color: 'gray', ml: 1, mb: -1 }}>{language}</Box>
      <Button size="small" variant="outlined" onClick={handleCopy} sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
        {copied ? 'copied' : 'copy'}
      </Button>
      <SyntaxHighlighter language={language} style={materialLight}>
        {value}
      </SyntaxHighlighter>
    </Box>
  );
};
export default CodeBlockWithCopy;
