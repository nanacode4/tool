import CodeBlock from '../../../components/ui/CodeBlock';
import PaginationNav from './../../../components/layout/PaginationNav';
import React, { useState } from 'react';
import { Box, Button, Typography, Alert, Paper, MenuItem, TextField } from '@mui/material';
import GreyTextField from './../../../components/ui/GreyTextField';
import QuizGroup from '../../../components/quiz/QuizGroup';

const WhileLoop = () => {
  const [variable1, setVariable1] = useState('');
  const [variable2, setVariable2] = useState('');
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [number3, setNumber3] = useState('');
  const [condition, setCondition] = useState('');
  const [printContent, setPrintContent] = useState('');
  const [operate, setOperate] = useState('');
  const [output, setOutput] = useState('');
  const [isError, setIsError] = useState(false);

  const handleRun = async () => {
    const code = `${variable1} = ${number1}
while ${variable2} ${condition} ${number2}:
    print(${printContent})
    ${variable2} ${operate} ${number3}`;

    const res = await fetch('http://localhost:8000/api/run/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, language: 'python' }),
    });

    const result = await res.json();
    if (result.error) {
      const lines = result.error.split('\n');
      const lastLine = lines[lines.length - 1];
      setOutput(`${lastLine}`);
      setIsError(true);
    } else {
      setOutput(result.output);
      setIsError(false);
    }
  };

  return (
    <Paper sx={{ padding: 6 }}>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Python While Loop
      </Typography>
      <Typography>A while loop lets you execute a block of code repeatedly as long as a certain condition is True.</Typography>

      <Typography variant="h5" fontWeight="bold" mt={1} mb={1}>
        Basic Syntax:
      </Typography>
      <Typography>The loop continues until the condition becomes False.</Typography>
      <CodeBlock>{`while condition:
    # code block to run`}</CodeBlock>

      <Typography variant="h5" fontWeight="bold" mb={1}>
        break Statement
      </Typography>
      <Typography>Stops the loop even if the condition is still true.</Typography>
      <CodeBlock>{`i = 1

while i <= 10:
    if i == 5:
        break
    print(i)
    i += 1`}</CodeBlock>

      <Typography variant="h5" fontWeight="bold" mb={1}>
        continue Statement
      </Typography>
      <Typography>Skips the current loop iteration and moves to the next.</Typography>
      <CodeBlock>{`i = 0

while i < 5:
    i += 1
    if i == 3:
        continue
    print(i)`}</CodeBlock>

      {/* while loop  Try it Yourself*/}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Try it Yourself
        </Typography>
        <Typography variant="h6" gutterBottom mb={2}>
          You can define a variable and use a while loop to repeatedly print and update it until a condition is no longer true.
        </Typography>
        <Paper elevation={2} sx={{ p: 2, maxWidth: 700 }}>
          <Box display="flex" alignItems="center" gap={1} sx={{ fontSize: '18px', mb: 1 }}>
            <GreyTextField value={variable1} onChange={(e) => setVariable1(e.target.value)} />
            <Typography> = </Typography>
            <GreyTextField value={number1} onChange={(e) => setNumber1(e.target.value)} />
          </Box>

          <Box display="flex" alignItems="center" gap={1} sx={{ fontSize: '18px', mb: 1 }}>
            <Typography fontWeight="bold">While </Typography>
            <GreyTextField value={variable2} onChange={(e) => setVariable2(e.target.value)} />
            <TextField select size="small" value={condition} onChange={(e) => setCondition(e.target.value)} sx={{ width: 80 }}>
              <MenuItem value="<">&lt;</MenuItem>
              <MenuItem value="<=">&le;</MenuItem>
              <MenuItem value="==">==</MenuItem>
              <MenuItem value="!=">!=</MenuItem>
              <MenuItem value=">">&gt;</MenuItem>
              <MenuItem value=">=">&ge;</MenuItem>
            </TextField>
            <GreyTextField value={number2} onChange={(e) => setNumber2(e.target.value)} />
            <Typography fontWeight="bold">:</Typography>
          </Box>

          {/* print(x)  */}
          <Box display="flex" alignItems="center" gap={1} mb={2} ml={4}>
            <Typography>print(</Typography>
            <GreyTextField value={printContent} onChange={(e) => setPrintContent(e.target.value)} />
            <Typography>)</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={2} ml={4}>
            <GreyTextField value={variable2} onChange={(e) => setVariable2(e.target.value)} />
            {/* <GreyTextField value={operate} onChange={(e) => setOperate(e.target.value)} /> */}
            <TextField select size="small" value={operate} onChange={(e) => setOperate(e.target.value)} sx={{ width: 80 }}>
              <MenuItem value="+=">+=</MenuItem>
              <MenuItem value="-=">-=</MenuItem>
            </TextField>
            <GreyTextField value={number3} onChange={(e) => setNumber3(e.target.value)} />
          </Box>

          <Box mb={1}>
            <Button variant="contained" onClick={handleRun}>
              Run
            </Button>
          </Box>

          {output && (
            <Box mt={2}>
              {isError ? (
                <Alert severity="error">{output}</Alert>
              ) : (
                <Box p={2} sx={{ backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                  <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                    {output}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </Paper>
      </Box>

      {/* quiz part */}
      <QuizGroup category="while" />
      <PaginationNav />
    </Paper>
  );
};

export default WhileLoop;
