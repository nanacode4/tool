import { Typography, Paper } from '@mui/material';
import CodeBlock from '../../../components/ui/CodeBlock';
import QuizGroup from '../../../components/quiz/QuizGroup';
import PaginationNav from './../../../components/layout/PaginationNav';

const Dictionaries = () => {
  return (
    <Paper sx={{ padding: 6 }}>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Python Dictionaries
      </Typography>
      <Typography>
        A dictionary is a collection of key-value pairs, where:
        <ul>
          <li>Each key must be unique</li>
          <li>Values can be of any type</li>
          <li>Dictionaries are unordered (before Python 3.7), but now they maintain insertion order</li>
          <li>Defined using curly braces {}</li>
        </ul>
      </Typography>
      <CodeBlock>{`person = {
    "name": "Alice",
    "age": 25,
    "is_student": True
}`}</CodeBlock>

      <Typography variant="h5" fontWeight="bold" mb={1}>
        Keys and Values
      </Typography>
      <Typography>
        <ul>
          <li>Keys: Must be unique and immutable (like strings, numbers, tuples)</li>
          <li>Values: Can be any type (strings, numbers, lists, other dictionaries)</li>
        </ul>
      </Typography>

      <Typography variant="h5" fontWeight="bold" mb={1}>
        Accessing Dictionary Items
      </Typography>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Access by key:
      </Typography>
      <Typography>You can access the items of a dictionary by referring to its key name, inside square brackets:</Typography>
      <CodeBlock>{`print(student["name"])  # John`}</CodeBlock>
      <Typography variant="h6" fontWeight="bold" mb={1}>
        Use .get()
      </Typography>
      <Typography>There is also a method called get( ) that will give you the same result:</Typography>
      <CodeBlock>{`print(student.get("email"))`}</CodeBlock>

      <Typography variant="h5" fontWeight="bold" mb={1}>
        Adding and Updating Items
      </Typography>
      <Typography>Adding an item to the dictionary is done by using a new index key and assigning a value to it.</Typography>
      <Typography>
        The update() method will update the dictionary with the items from a given argument. If the item does not exist, the item will be added.
      </Typography>
      <CodeBlock>{`student["email"] = "john@example.com"  # Add
student["name"] = "Johnny"             # Update`}</CodeBlock>

      <Typography variant="h5" fontWeight="bold" mb={1}>
        Removing Items
      </Typography>
      <Typography>The pop() method removes the item with the specified key name.</Typography>
      <Typography>The del keyword removes the item with the specified key name.</Typography>
      <Typography>The clear() method empties the dictionary.</Typography>
      <CodeBlock>{`student.pop("grades")
del student["email"]
student.clear()`}</CodeBlock>
      {/* quiz part */}
      <QuizGroup category="dict" />
      <PaginationNav />
    </Paper>
  );
};

export default Dictionaries;
