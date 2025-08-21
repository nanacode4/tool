import { Box, Button, Typography, Alert, Paper } from '@mui/material';
import CodeBlock from '../../../components/ui/CodeBlock';
import QuizGroup from '../../../components/quiz/QuizGroup';
import PaginationNav from './../../../components/layout/PaginationNav';
import { useState } from 'react';
import GreyTextField from './../../../components/ui/GreyTextField';

const Functions = () => {
  const [func, setFunc] = useState('');
  const [print, setPrint] = useState('');
  // const [retu, setRetu] = useState('');
  const [call, setCall] = useState('');
  const [output, setOutput] = useState('');
  const [isError, setIsError] = useState(false);

  const handleRun = async () => {
    const code = `
def ${func}:
    print(${print})

${call}
`;

    try {
      const res = await fetch('http://localhost:8000/api/run/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language: 'python' }),
      });

      const data = await res.json();

      if (data.error) {
        setIsError(true);
        setOutput(data.error);
      } else {
        setIsError(false);
        setOutput(data.output);
      }
    } catch (err) {
      setIsError(true);
      setOutput('Network error or backend not running.');
    }
  };

  return (
    <>
      <Paper sx={{ padding: 6 }}>
        <Typography variant="h4" fontWeight="bold" mb={1}>
          Python Functions
        </Typography>
        <Typography>A function is a block of code which only runs when it is called.</Typography>
        <Typography>You can pass data, known as parameters, into a function.</Typography>
        <Typography>A function can return data as a result.</Typography>

        <Typography variant="h5" fontWeight="bold" mt={1} mb={1}>
          Creating a Function
        </Typography>
        <CodeBlock>{`def greet():
    print("Hello, world!")

greet()  # Call the function`}</CodeBlock>

        <Typography variant="h5" fontWeight="bold" mb={1}>
          Arguments
        </Typography>
        <Typography>Information can be passed into functions as arguments.</Typography>
        <Typography>
          Arguments are specified after the function name, inside the parentheses. You can add as many arguments as you want, just separate them with
          a comma.
        </Typography>
        <CodeBlock>{`def greet(name="Guest"):
    print("Hello,", name)

greet()         # Hello, Guest
greet("Bob")    # Hello, Bob`}</CodeBlock>

        <Typography variant="h5" fontWeight="bold" mb={1}>
          Return Values
        </Typography>
        <Typography>To let a function return a value, use the return statement:</Typography>
        <CodeBlock>{`def add(a, b):
    return a + b

result = add(5, 3)
print(result)  # 8`}</CodeBlock>

        {/* function : Try it Yourself */}
        <Box mt={6}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Try it Yourself
          </Typography>
          <Typography variant="h6" gutterBottom mb={2}>
            In this area, you can define and call a function to test how it works.
          </Typography>

          <Paper elevation={2} sx={{ p: 2, maxWidth: 700 }}>
            <Box display="flex" alignItems="center" gap={1} sx={{ fontSize: '18px', mb: 1 }}>
              <Typography fontWeight="bold">def </Typography>
              <GreyTextField value={func} onChange={(e) => setFunc(e.target.value)} />
              <Typography>: </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={2} ml={4}>
              <Typography>print(</Typography>
              <GreyTextField value={print} onChange={(e) => setPrint(e.target.value)} />
              <Typography>)</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} sx={{ fontSize: '18px', mb: 1 }}>
              <Box display="flex" alignItems="center" gap={10}>
                <GreyTextField value={call} onChange={(e) => setCall(e.target.value)} />
                <Typography color="text.secondary"># Call the function</Typography>
              </Box>
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
        <QuizGroup category="function" />
        <PaginationNav />
      </Paper>
    </>
  );
};

export default Functions;
