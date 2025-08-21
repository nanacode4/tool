import React, { useState } from 'react';
import { Container, Typography, Button, Box, Paper, Grid, MenuItem, Select, TextField } from '@mui/material';
import Editor from '@monaco-editor/react';
import ReactMarkdown from 'react-markdown';
import CodeBlockWithCopy from './../components/ui/CodeBlockWithCopy';

const Coding = () => {
  const [code, setCode] = useState(`print("Hello, world!")`);
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('python');

  const [question, setQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_HF_API_URL;

  const headers = {
    Authorization: `Bearer ${process.env.REACT_APP_HF_TOKEN}`,
    'Content-Type': 'application/json',
  };

  const handleRunCode = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/run/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          language: language,
        }),
      });

      const result = await response.json();
      setOutput(result.error ? `Error:\n${result.error}` : `Output:\n${result.output}`);
    } catch (error) {
      setOutput('Failed to connect to server');
    }
  };

  // Send AI Request
  const handleAskAI = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
          inputs: question,
          parameters: { max_new_tokens: 256, temperature: 0.7 },
        }),
      });
      const data = await res.json();
      if (data && data[0] && data[0].generated_text) {
        setAiResponse(data[0].generated_text);
      } else {
        setAiResponse('Unable to get answer, please try again later.');
      }
    } catch (error) {
      setAiResponse('Request failed：' + error.message);
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Coding Page
      </Typography>

      <Grid container spacing={3}>
        {/* Left: Code editor */}
        <Grid item xs={12} md={6}>
          <Select
            size="small"
            value={language}
            onChange={(e) => {
              setLanguage(e.target.value);
              setCode(
                e.target.value === 'java'
                  ? `class Code {\n  public static void main(String[] args) {\n    System.out.println("Hello, world!");\n  }\n}`
                  : e.target.value === 'cpp'
                  ? `#include <iostream>\nusing namespace std;\nint main() {\n    cout << "Hello, world!" << endl;\n    return 0;\n}`
                  : `print("Hello, world!")`
              );
            }}
            sx={{ mb: 2 }}
          >
            <MenuItem value="java">Java</MenuItem>
            <MenuItem value="python">Python</MenuItem>
            <MenuItem value="cpp">C++</MenuItem>
          </Select>
          <Box sx={{ border: '1px solid #ccc', borderRadius: '5px', overflow: 'hidden' }}>
            <Editor
              height="400px"
              language={language === 'cpp' ? 'cpp' : language}
              value={code}
              onChange={(newCode) => setCode(newCode)}
              theme="vs-dark"
            />
          </Box>
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleRunCode}>
            Run Code
          </Button>
          <Paper elevation={3} sx={{ mt: 3, p: 2, backgroundColor: '#f5f5f5' }}>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', color: output.startsWith('Error:') ? 'red' : 'black' }}>
              {output}
            </Typography>
          </Paper>
        </Grid>

        {/* Right: AI code assistant */}
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            AI Code Assistant
          </Typography>
          <TextField
            fullWidth
            label="Ask anything"
            variant="outlined"
            multiline
            rows={4}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleAskAI} disabled={loading}>
            {loading ? '...' : 'Submit a question'}
          </Button>
          <Paper elevation={3} sx={{ mt: 3, p: 2, backgroundColor: '#f5f5f5' }}>
            <ReactMarkdown
              children={aiResponse}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const codeStr = String(children).replace(/\n$/, '');
                  return !inline && match ? (
                    <CodeBlockWithCopy language={match[1]} value={codeStr} />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Coding;
