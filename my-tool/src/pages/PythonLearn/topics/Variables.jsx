import React, { useState } from 'react';
import { Typography, Paper, Box, Button } from '@mui/material';
import axios from 'axios';
import QuizGroup from '../../../components/quiz/QuizGroup';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-monokai';
import CodeBlock from '../../../components/ui/CodeBlock';
import PaginationNav from './../../../components/layout/PaginationNav';

const Variables = () => {
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState([]);

  const validateCode = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/validate/', {
        code,
      });
      setFeedback(response.data.results || []);
    } catch (error) {
      setFeedback([{ message: 'Error validating code.', success: false }]);
    }
  };

  return (
    <Paper sx={{ padding: 6 }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Python Variables
      </Typography>
      <Typography>
        A variable in Python is like a container that holds some data or value. You can think of it as a label or a name you give to a piece of
        information so you can refer to it later. Variables do not need to be declared with any particular type, and can even change type after they
        have been set.
      </Typography>

      <Typography variant="h5" fontWeight="bold" mb={1} mt={1}>
        How to create a variable
      </Typography>
      <Typography>You just pick a name and use the = sign to assign a value to it:</Typography>
      <CodeBlock>{`name = "Alice"
age = 25
is_student = True`}</CodeBlock>

      <Typography variant="h5" fontWeight="bold" mb={1} mt={1}>
        Rules for variable names
      </Typography>
      <ul>
        <li>
          <Typography>Must start with a letter or or the underscore character</Typography>
        </li>
        <li>
          <Typography>Can contain letters, numbers, and underscores</Typography>
        </li>
        <li>
          <Typography>Can’t start with a number</Typography>
        </li>
        <li>
          <Typography>Can’t be a Python keyword like if, while, class, etc.</Typography>
        </li>
      </ul>
      <Typography variant="h5" fontWeight="bold" mb={1} mt={1}>
        Single or Double Quotes?
      </Typography>
      <Typography>String variables can be declared either by using single or double quotes:</Typography>
      <CodeBlock>{`x = "John"
# is the same as
x = 'John'`}</CodeBlock>

      <Typography variant="h5" fontWeight="bold" mb={1} mt={1}>
        Multi Words Variable Names
      </Typography>
      <Typography>Variable names with more than one word can be difficult to read.</Typography>
      <Typography>There are several techniques you can use to make them more readable:</Typography>
      <Typography variant="h6" mt={1}>
        Camel Case
      </Typography>
      <Typography>Each word, except the first, starts with a capital letter:</Typography>
      <CodeBlock>{`myVariableName = "Mary"`}</CodeBlock>

      <Typography variant="h6" mt={1}>
        Pascal Case
      </Typography>
      <Typography>Each word starts with a capital letter:</Typography>
      <CodeBlock>{`MyVariableName = "Mary"`}</CodeBlock>

      <Typography variant="h6">Snake Case</Typography>
      <Typography>Each word is separated by an underscore character:</Typography>
      <CodeBlock>{`my_variable_name = "Mary"`}</CodeBlock>

      <Typography variant="h5" fontWeight="bold" mb={1} mt={1}>
        Many Values to Multiple Variables
      </Typography>
      <Typography>Python allows you to assign values to multiple variables in one line:</Typography>
      <CodeBlock>{`x, y, z = "Orange", "Banana", "Cherry"`}</CodeBlock>
      <Typography>Note: Make sure the number of variables matches the number of values, or else you will get an error.</Typography>

      <Box mt={3}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Try it Yourself
        </Typography>
        <Typography gutterBottom>
          Create <strong>three variables</strong> with the following values:
        </Typography>
        <Box component="ul" sx={{ pl: 3, mb: 2 }}>
          <li>
            <Typography>
              <code>name</code> (a string): set it to <code>"Alice"</code>
            </Typography>
          </li>
          <li>
            <Typography>
              <code>age</code> (an integer): set it to <code>25</code>
            </Typography>
          </li>
          <li>
            <Typography>
              <code>height</code> (a float): set it to <code>1.75</code>
            </Typography>
          </li>
        </Box>
        <Typography gutterBottom>Then, print the following sentence using these variables:</Typography>
        <CodeBlock>My name is Alice, I am 25 years old and 1.75m tall.</CodeBlock>
      </Box>
      <Box mt={3}>
        <Paper sx={{ mt: 2, p: 2 }}>
          <AceEditor
            mode="python"
            theme="monokai"
            name="code-editor"
            value={code}
            onChange={(val) => setCode(val)}
            fontSize={18}
            width="80%"
            height="200px"
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            setOptions={{
              showLineNumbers: true,
              tabSize: 4,
              useWorker: false,
            }}
          />
          <Button variant="contained" color="primary" onClick={validateCode} sx={{ mt: 2 }}>
            Submit
          </Button>
        </Paper>
        {feedback.length > 0 && (
          <Paper sx={{ mt: 2, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Feedback:
            </Typography>
            {feedback.map((item, index) => (
              <Box key={index} display="flex" alignItems="center" mb={1}>
                <Typography
                  sx={{
                    mr: 1,
                    color: item.success ? 'green' : 'red',
                    fontWeight: 'bold',
                  }}
                >
                  {item.success ? '✔️' : '❌'}
                </Typography>
                <Typography>{item.message}</Typography>
              </Box>
            ))}
          </Paper>
        )}
      </Box>

      {/* quiz part */}
      <QuizGroup category="variable" />
      <PaginationNav />
    </Paper>
  );
};

export default Variables;
