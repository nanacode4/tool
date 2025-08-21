import { Typography, Paper, Box } from '@mui/material';
import CodeBlock from '../../../components/ui/CodeBlock';
import PaginationNav from './../../../components/layout/PaginationNav';
import QuizGroup from '../../../components/quiz/QuizGroup';
const Strings = () => {
  return (
    <Paper sx={{ padding: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Python Strings
      </Typography>
      <Typography>A string is a sequence of characters (letters, numbers, symbols) enclosed in: Single quotes ' ', Double quotes " ".</Typography>
      <CodeBlock>{`name = "Alice"
message = 'Hello, world!'`}</CodeBlock>
      <Typography mt={1}>Python also supports triple quotes for multi-line strings:</Typography>
      <CodeBlock>{`text = """This is
ma multi-line
string."""`}</CodeBlock>

      <Typography variant="h5" fontWeight="bold" gutterBottom mt={1}>
        String Data Type
      </Typography>
      <Typography>All strings are of type str in Python.</Typography>
      <CodeBlock>{`x = "Hello"
print(type(x))  # <class 'str'>`}</CodeBlock>

      <Typography variant="h5" fontWeight="bold" gutterBottom mt={1}>
        String Formatting
      </Typography>
      <Typography variant="h6">f-Strings</Typography>
      <CodeBlock>{`name = "Alice"
age = 25
print(f"My name is {name} and I am {age} years old.")`}</CodeBlock>

      <Typography variant="h6">.format() method</Typography>
      <CodeBlock>{`z = 2 + 3j
print(type(z))        # <class 'complex'>`}</CodeBlock>
      <Typography>You can convert from one type to another with the int(), float(), and complex() methods:</Typography>
      <CodeBlock>{`print("My name is {} and I am {}.".format(name, age))`}</CodeBlock>
      <Typography>Note: You cannot change a string once it’s created.</Typography>
      {/* quiz part */}
      <QuizGroup category="strings" />
      <PaginationNav />
    </Paper>
  );
};
export default Strings;
