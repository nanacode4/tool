import { Typography, Paper, Box, Link } from '@mui/material';
import CodeBlock from '../../../components/ui/CodeBlock';
import QuizGroup from '../../../components/quiz/QuizGroup';
import PaginationNav from './../../../components/layout/PaginationNav';

const Lists = () => {
  return (
    <Paper sx={{ padding: 6 }}>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Python Lists
      </Typography>
      <Typography>
        Lists are used to store multiple items in a single variable.Lists are written using square brackets [ ], and items are separated by commas.
      </Typography>
      <Typography>A list is a collection of items that is:</Typography>
      <Typography>
        <ul>
          <li>Ordered (items have a defined order)</li>
          <li>Mutable (you can change, add, or remove items)</li>
          <li>Allows duplicates</li>
        </ul>
      </Typography>
      <CodeBlock>{`mixed = [1, "hello", 3.14, True]`}</CodeBlock>

      <Typography variant="h5" fontWeight="bold" mb={1}>
        Basic List Operations
      </Typography>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Accessing Items
      </Typography>
      <Typography>You can access items by index (starting from 0):</Typography>
      <CodeBlock>{`fruits = ["apple", "banana", "cherry"]
print(fruits[0])    # apple
print(fruits[-1])   # cherry (last item)
`}</CodeBlock>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Changing Items
      </Typography>
      <CodeBlock>{`fruits[1] = "blueberry"
print(fruits)  # ['apple', 'blueberry', 'cherry']
`}</CodeBlock>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        List Length
      </Typography>
      <CodeBlock>{`print(len(fruits))  # 3
`}</CodeBlock>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Adding Items
      </Typography>
      <Typography>
        <ul>
          <li>append( ) → Adds to the end</li>
          <li>insert(index, value) → Adds at specific position</li>
        </ul>
      </Typography>
      <CodeBlock>{`fruits.append("orange")
fruits.insert(1, "grape")
`}</CodeBlock>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Removing Items
      </Typography>
      <Typography>
        <ul>
          <li>remove(value) → Removes first match</li>
          <li>pop(index) → Removes and returns by index</li>
          <li>clear( ) → Empties the list</li>
        </ul>
      </Typography>
      <CodeBlock>{`fruits.remove("apple")
fruits.pop(0)
fruits.clear()
`}</CodeBlock>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Looping Through Lists
      </Typography>
      <CodeBlock>{`for fruit in fruits:
    print(fruit)
`}</CodeBlock>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Slicing Lists
      </Typography>
      <CodeBlock>{`nums = [10, 20, 30, 40, 50]
print(nums[1:4])   # [20, 30, 40]
print(nums[:3])    # [10, 20, 30]
print(nums[-2:])   # [40, 50]
`}</CodeBlock>
      {/* quiz part */}
      <QuizGroup category="list" />
      <PaginationNav />
    </Paper>
  );
};

export default Lists;
