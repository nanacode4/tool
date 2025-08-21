import { Typography, Paper, Box } from '@mui/material';
import CodeBlock from '../../../components/ui/CodeBlock';
import PaginationNav from './../../../components/layout/PaginationNav';
import QuizGroup from '../../../components/quiz/QuizGroup';

const Numbers = () => {
  return (
    <Paper sx={{ padding: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Python Number
      </Typography>
      <Typography>
        In Python, numbers are one of the most commonly used data types. There are three main types of numeric data:int, float, complex.
      </Typography>

      <Typography variant="h5" fontWeight="bold" gutterBottom mt={1}>
        Int
      </Typography>
      <Typography>Int, or integer, is a whole number, positive or negative, without decimals, of unlimited length.</Typography>
      <CodeBlock>{`a = 10
b = -25
c = 10000000000
print(type(a))     # <class 'int'>`}</CodeBlock>

      <Typography variant="h5" fontWeight="bold" gutterBottom mt={1}>
        Float
      </Typography>
      <Typography>
        Float, or floating point number is a number, positive or negative, containing one or more decimals. Float can also be scientific numbers with
        an "e" to indicate the power of 10.
      </Typography>
      <CodeBlock>{`price = 99.99
pi = 3.14159
sci = 1.2e3         # 1200.0
print(type(price))  # <class 'float'>`}</CodeBlock>

      <Typography variant="h5" fontWeight="bold" gutterBottom mt={1}>
        Complex
      </Typography>
      <Typography>Written as real + imaginary part (e.g. 2 + 3j). j is the imaginary unit in Python</Typography>
      <CodeBlock>{`z = 2 + 3j
print(type(z))      # <class 'complex'>`}</CodeBlock>

      <Typography variant="h5" fontWeight="bold" gutterBottom mt={1}>
        Type Conversion
      </Typography>
      <Typography>You can convert from one type to another with the int(), float(), and complex() methods:</Typography>
      <CodeBlock>
        {`x = 5               # int
y = float(x)        # 5.0
z = int(3.9)        # 3
      
print(type(y))      # <class 'float'>
print(z)            # 3`}
      </CodeBlock>
      <Typography>Note: You cannot convert complex numbers into another number type.</Typography>
      {/* quiz part */}
      <QuizGroup category="numbers" />
      <PaginationNav />
    </Paper>
  );
};
export default Numbers;
