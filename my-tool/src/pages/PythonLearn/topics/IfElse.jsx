import CodeBlock from '../../../components/ui/CodeBlock';
import PaginationNav from './../../../components/layout/PaginationNav';
import React, { useState } from 'react';
import { Box, Button, Typography, Alert, Paper, MenuItem, TextField } from '@mui/material';
import GreyTextField from './../../../components/ui/GreyTextField';

const IfElse = () => {
  const [variable1, setVariable1] = useState('');
  const [variable2, setVariable2] = useState('');
  const [variable3, setVariable3] = useState('');
  const [variable4, setVariable4] = useState('');
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [print1, setPrint1] = useState('');
  const [print2, setPrint2] = useState('');
  const [operate, setOperate] = useState('');
  const [output, setOutput] = useState('');
  const [isError, setIsError] = useState(false);

  const handleRun = async () => {
    let code = '';

    if (variable1 && number1) {
      code += `${variable1} = ${number1}\n`;
    }
    if (variable2 && number2) {
      code += `${variable2} = ${number2}\n`;
    }

    code += `if ${variable3} ${operate} ${variable4}:\n`;
    code += `    print(${print1})\n`;
    code += `else:\n`;
    code += `    print(${print2})\n`;

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
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Python If ... Else
      </Typography>
      <Typography>
        These are conditional statements that allow your code to make decisions and execute
        different blocks depending on conditions.
      </Typography>

      <Typography variant="h5" fontWeight="bold" mb={1} mt={1}>
        The if Statement
      </Typography>
      <Typography>Used to run code only if a condition is True.</Typography>
      <CodeBlock>{`age = 18

if age >= 18:
    print("You can vote!")`}</CodeBlock>

      <Typography variant="h5" fontWeight="bold" mb={1}>
        The elif Statement (else if)
      </Typography>
      <Typography>
        Used to check another condition if the first one is false.Python checks from top to bottom
        and stops once a condition is True.
      </Typography>
      <CodeBlock>{`score = 75

if score >= 90:
    print("Grade: A")
elif score >= 80:
    print("Grade: B")
elif score >= 70:
    print("Grade: C")`}</CodeBlock>

      <Typography variant="h5" fontWeight="bold" mb={1}>
        The else Statement
      </Typography>
      <Typography>Used if none of the if or elif conditions are True.</Typography>
      <CodeBlock>{`temperature = 10

if temperature > 30:
    print("Hot")
elif temperature > 20:
    print("Warm")
else:
    print("Cold")`}</CodeBlock>

      {/* if else  - Try it Yourself */}
      <Box sx={{ p: 2 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom mb={1}>
          Try it Yourself
        </Typography>
        <Typography variant="h6" gutterBottom mb={2}>
          Define two variables, assign values, choose a comparison operator, and print one based on
          the condition.
        </Typography>
        <Paper elevation={2} sx={{ p: 2, maxWidth: 700 }}>
          {/* x =  */}
          <Box display="flex" alignItems="center" gap={1} sx={{ fontSize: '18px', mb: 1 }}>
            <GreyTextField value={variable1} onChange={(e) => setVariable1(e.target.value)} />
            <Typography> = </Typography>
            <GreyTextField value={number1} onChange={(e) => setNumber1(e.target.value)} />
          </Box>

          {/* y =  */}
          <Box display="flex" alignItems="center" gap={1} sx={{ fontSize: '18px', mb: 1 }}>
            <GreyTextField value={variable2} onChange={(e) => setVariable2(e.target.value)} />
            <Typography> = </Typography>
            <GreyTextField value={number2} onChange={(e) => setNumber2(e.target.value)} />
          </Box>
          {/* if x > y : */}
          <Box display="flex" alignItems="center" gap={1} sx={{ fontSize: '18px', mb: 1 }}>
            <Typography fontWeight="bold">if </Typography>
            <GreyTextField value={variable3} onChange={(e) => setVariable3(e.target.value)} />
            {/* <GreyTextField value={operate} onChange={(e) => setOperate(e.target.value)} /> */}
            <TextField
              select
              size="small"
              value={operate}
              onChange={(e) => setOperate(e.target.value)}
              sx={{ width: 80 }}
            >
              <MenuItem value="<">&lt;</MenuItem>
              <MenuItem value="<=">&le;</MenuItem>
              <MenuItem value="==">==</MenuItem>
              <MenuItem value="!=">!=</MenuItem>
              <MenuItem value=">">&gt;</MenuItem>
              <MenuItem value=">=">&ge;</MenuItem>
            </TextField>
            <GreyTextField value={variable4} onChange={(e) => setVariable4(e.target.value)} />
            <Typography fontWeight="bold">:</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={2} ml={4}>
            <Typography>print( </Typography>
            <GreyTextField value={print1} onChange={(e) => setPrint1(e.target.value)} />
            <Typography> )</Typography>
          </Box>
          {/* else: print("xxx") */}
          <Box display="flex" alignItems="center" gap={1} sx={{ fontSize: '18px', mb: 1 }}>
            <Typography fontWeight="bold">else: </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={2} ml={4}>
            <Typography>print( </Typography>
            <GreyTextField value={print2} onChange={(e) => setPrint2(e.target.value)} />
            <Typography> )</Typography>
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

      <PaginationNav />
    </Paper>
  );
};

export default IfElse;
