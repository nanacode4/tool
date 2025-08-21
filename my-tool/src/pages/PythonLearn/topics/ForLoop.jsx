import CodeBlock from '../../../components/ui/CodeBlock';
import PaginationNav from '../../../components/layout/PaginationNav';
import React, { useState } from 'react';
import { Box, Button, Typography, Alert, Paper } from '@mui/material';
import GreyTextField from './../../../components/ui/GreyTextField';


const ForLoop = () => {
  const [variable1, setVariable1] = useState('');
  const [variable2, setVariable2] = useState('');
  const [variable3, setVariable3] = useState('');
  const [iterable, setIterable] = useState('');
  const [printContent, setPrintContent] = useState('');
  const [output, setOutput] = useState('');
  const [isError, setIsError] = useState(false);

  const handleRun = async () => {
    const code = `${variable1} = ${iterable}\nfor ${variable2} in ${variable3}:\n    print(${printContent})`;

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
        Python For Loop
      </Typography>
      <Typography>A for loop is used for iterating over a sequence (that is either a list, a tuple, a dictionary, a set, or a string).</Typography>
      <Typography>
        This is less like the for keyword in other programming languages, and works more like an iterator method as found in other object-orientated
        programming languages.
      </Typography>
      <Typography>With the for loop we can execute a set of statements, once for each item in a list, tuple, set etc.</Typography>
      <Typography variant="h5" fontWeight="bold" mt={1} mb={1}>
        Basic Syntax:
      </Typography>
      <CodeBlock>{`for item in sequence:
    # do something with item`}</CodeBlock>
      <Typography>
        <ul>
          <li>item is a temporary variable that takes the value of each element.</li>
          <li>sequence is anything iterable (list, tuple, string, range, etc.)</li>
        </ul>
      </Typography>
      <Typography variant="h5" fontWeight="bold" mb={1}>
        The break Statement
      </Typography>
      <Typography>With the break statement we can stop the loop before it has looped through all the items:</Typography>
      <CodeBlock>{`for num in range(5):
    if num == 3:
        break
    print(num)`}</CodeBlock>
      <Typography variant="h5" fontWeight="bold" mb={1}>
        The continue Statement
      </Typography>
      <Typography>With the continue statement we can stop the current iteration of the loop, and continue with the next.</Typography>
      <CodeBlock>{`for num in range(5):
    if num == 2:
        continue
    print(num)`}</CodeBlock>
      <Typography variant="h5" fontWeight="bold" mb={1}>
        The range( ) Function
      </Typography>
      <Typography>
        The range( ) function returns a sequence of numbers, starting from 0 by default, and increments by 1 (by default), and ends at a specified
        number.
      </Typography>
      <CodeBlock>{`for i in range(5):  # 0 to 4
    print(i)`}</CodeBlock>

      {/* for x in y : Try it Yourself */}
      <Box mt={6}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Try it Yourself
        </Typography>
        <Typography variant="h6" gutterBottom mb={2}>
          Enter a variable and an iterable object to build a for loop. Run the code to see how the loop executes and prints results based on your
          input.
        </Typography>

        <Paper elevation={2} sx={{ p: 2, maxWidth: 700 }}>
          <Box display="flex" alignItems="center" gap={1} sx={{ fontSize: '18px', mb: 1 }}>
            <GreyTextField value={variable1} onChange={(e) => setVariable1(e.target.value)} />
            <Typography>=</Typography>
            <GreyTextField value={iterable} onChange={(e) => setIterable(e.target.value)} />
          </Box>
          <Box display="flex" alignItems="center" gap={1} sx={{ fontSize: '18px', mb: 1 }}>
            <Typography fontWeight="bold">for</Typography>
            <GreyTextField value={variable2} onChange={(e) => setVariable2(e.target.value)} />
            <Typography fontWeight="bold">in</Typography>
            <GreyTextField value={variable3} onChange={(e) => setVariable3(e.target.value)} />
            <Typography fontWeight="bold">:</Typography>
          </Box>

          {/* print(x)  */}
          <Box display="flex" alignItems="center" gap={1} mb={2} ml={4}>
            <Typography>print(</Typography>
            <GreyTextField value={printContent} onChange={(e) => setPrintContent(e.target.value)} />
            <Typography>)</Typography>
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

export default ForLoop;
