import { Typography, Paper } from '@mui/material';
import CodeBlock from '../../../components/ui/CodeBlock';
import QuizGroup from '../../../components/quiz/QuizGroup';
import PaginationNav from './../../../components/layout/PaginationNav';

const Sets = () => {
  return (
    <Paper sx={{ padding: 6 }}>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Python Sets
      </Typography>
      <Typography>
        Sets are used to store multiple items in a single variable. A set is a collection which is unordered, unchangeable, unindexed , and do not
        allow duplicate values. Sets are written with curly brackets.
      </Typography>

      <Typography variant="h5" fontWeight="bold" mb={1}>
        Creating a Set
      </Typography>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Basic Set
      </Typography>
      <CodeBlock>{`fruits = {"apple", "banana", "cherry"}`}</CodeBlock>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Creating Empty Set
      </Typography>
      <CodeBlock>{`empty = set()`}</CodeBlock>

      <Typography variant="h5" fontWeight="bold" mb={1}>
        Accessing Set Items
      </Typography>
      <Typography>You cannot access items by index (no order), but you can loop through a set:</Typography>
      <Typography>
        But you can loop through the set items using a for loop, or ask if a specified value is present in a set, by using the in keyword.
      </Typography>
      <CodeBlock>{`for fruit in fruits:
    print(fruit)`}</CodeBlock>

      <Typography variant="h5" fontWeight="bold" mb={1}>
        Adding Items
      </Typography>
      <Typography>
        Once a set is created, you cannot change its items, but you can add new items.To add one item to a set use the add( ) method.
      </Typography>
      <CodeBlock>{`fruits.add("orange")
fruits.update(["mango", "grape"])`}</CodeBlock>

      <Typography variant="h5" fontWeight="bold" mb={1}>
        Removing Items
      </Typography>
      <CodeBlock>{`fruits.remove("apple")
fruits.discard("lemon")
fruits.pop()
fruits.clear()`}</CodeBlock>
      {/* quiz part */}
      <QuizGroup category="set" />
      <PaginationNav />
    </Paper>
  );
};

export default Sets;
