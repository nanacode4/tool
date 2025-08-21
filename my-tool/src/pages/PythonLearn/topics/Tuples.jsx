import { Typography, Paper, Box } from '@mui/material';
import CodeBlock from '../../../components/ui/CodeBlock';
import PaginationNav from './../../../components/layout/PaginationNav';
import QuizGroup from '../../../components/quiz/QuizGroup';

const Tuples = () => {
  return (
    <Paper sx={{ padding: 6 }}>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Python Tuples
      </Typography>
      <Typography>
        Tuples are used to store multiple items in a single variable. A tuple is a collection which is ordered, unchangeable, and allow duplicate
        values.Tuples are written with round brackets.
      </Typography>

      <Typography variant="h5" fontWeight="bold" mb={1}>
        Creating Tuples
      </Typography>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Basic Tuple
      </Typography>
      <CodeBlock>{`person = ("Alice", 25, "Developer")
`}</CodeBlock>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Single-Item Tuple
      </Typography>
      <Typography>You must include a comma:</Typography>
      <CodeBlock>{`single = ("apple",)
print(type(single))  # <class 'tuple'>
`}</CodeBlock>
      <Typography>Without comma:</Typography>
      <CodeBlock>{`not_a_tuple = ("apple")  # this is a string!
`}</CodeBlock>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Mixed Types
      </Typography>
      <CodeBlock>{`mixed = (1, "hello", 3.14, True)
`}</CodeBlock>

      <Typography variant="h5" fontWeight="bold" mb={1}>
        Accessing Tuple Items
      </Typography>
      <CodeBlock>{`t = ("a", "b", "c")
print(t[0])     # a
print(t[-1])    # c
`}</CodeBlock>

      <Typography variant="h5" fontWeight="bold" mb={1}>
        Slicing Tuples
      </Typography>
      <CodeBlock>{`nums = (10, 20, 30, 40)
print(nums[1:3])  # (20, 30)
`}</CodeBlock>
      {/* quiz part */}
      <QuizGroup category="tuples" />
      <PaginationNav />
    </Paper>
  );
};
export default Tuples;
