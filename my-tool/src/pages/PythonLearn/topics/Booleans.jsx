import { Typography, Paper, Box } from '@mui/material';
import CodeBlock from '../../../components/ui/CodeBlock';
import QuizGroup from '../../../components/quiz/QuizGroup';
import PaginationNav from './../../../components/layout/PaginationNav';

const Booleans = () => {
  return (
    <Paper sx={{ padding: 6 }}>
      <Typography variant="h4" fontWeight="bold">
        Python Booleans
      </Typography>
      <Typography>A Boolean is a data type that can only have one of two values:</Typography>
      <Typography>
        <ul>
          <li>True</li>
          <li>False</li>
        </ul>
      </Typography>
      <Typography>You often get Boolean values as a result of comparison or logical operations:</Typography>
      <CodeBlock>
        {`print(5 > 3)     # True
print(5 == 3)    # False`}
      </CodeBlock>
      <Typography>Booleans are super important in conditions, loops, comparisons, and decision-making in Python.</Typography>

      <Typography variant="h5" fontWeight="bold" mt={1}>
        Most Values are True
      </Typography>
      <Typography>Almost any value is evaluated to True if it has some sort of content.</Typography>
      <Typography>Any string is True, except empty strings.</Typography>
      <Typography>Any number is True, except 0.</Typography>
      <Typography>Any list, tuple, set, and dictionary are True, except empty ones.</Typography>
      <CodeBlock>
        {`bool("abc")
bool(123)
bool(["apple", "cherry", "banana"])`}
      </CodeBlock>

      <Typography variant="h5" fontWeight="bold" mt={1}>
        Some Values are False
      </Typography>
      <Typography>
        In fact, there are not many values that evaluate to False, except empty values, such as (), [], {}, "", the number 0, and the value None. And
        of course the value False evaluates to False.
      </Typography>
      <CodeBlock>
        {`bool(False)
bool(None)
bool(0)`}
      </CodeBlock>

      {/* quiz part */}
      <QuizGroup category="boolean" />
      <PaginationNav />
    </Paper>
  );
};
export default Booleans;
