import { Typography, Paper, Box } from '@mui/material';
import CodeBlock from '../../../components/ui/CodeBlock';
import QuizGroup from '../../../components/quiz/QuizGroup';
import PaginationNav from './../../../components/layout/PaginationNav';

const DataTypes = () => {
  
  return (
    <Paper sx={{ padding: 6 }}>
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Python Data type
      </Typography>
      <Typography>
        In Python, data types tell the interpreter what kind of value a variable holds. You don’t need to declare the type explicitly — Python figures
        it out automatically based on the value.
      </Typography>
      <Typography mb={2}>Python has the following data types built-in by default, in these categories:</Typography>

      <Box>
        {/* Text Type */}
        <Box display="flex" alignItems="center" mb={1}>
          <Typography sx={{ width: 180, mr: 1 }}>Text Type:</Typography>
          <Typography component="span" sx={typeStyle}>
            str
          </Typography>
        </Box>

        {/* Numeric Types */}
        <Box display="flex" alignItems="center" mb={1}>
          <Typography sx={{ width: 180, mr: 1 }}>Numeric Types:</Typography>
          {['int', 'float', 'complex'].map((type) => (
            <Typography key={type} component="span" sx={typeStyle}>
              {type}
            </Typography>
          ))}
        </Box>

        {/* Sequence Types */}
        <Box display="flex" alignItems="center" mb={1}>
          <Typography sx={{ width: 180, mr: 1 }}>Sequence Types:</Typography>
          {['list', 'tuple', 'range'].map((type) => (
            <Typography key={type} component="span" sx={typeStyle}>
              {type}
            </Typography>
          ))}
        </Box>

        {/* Mapping Type */}
        <Box display="flex" alignItems="center" mb={1}>
          <Typography sx={{ width: 180, mr: 1 }}>Mapping Type:</Typography>
          <Typography component="span" sx={typeStyle}>
            dict
          </Typography>
        </Box>

        {/* Set Types */}
        <Box display="flex" alignItems="center" mb={1}>
          <Typography sx={{ width: 180, mr: 1 }}>Set Types:</Typography>
          {['set', 'frozenset'].map((type) => (
            <Typography key={type} component="span" sx={typeStyle}>
              {type}
            </Typography>
          ))}
        </Box>

        {/* Boolean Type */}
        <Box display="flex" alignItems="center" mb={1}>
          <Typography sx={{ width: 180, mr: 1 }}>Boolean Type:</Typography>
          <Typography component="span" sx={typeStyle}>
            bool
          </Typography>
        </Box>

        {/* Binary Types */}
        <Box display="flex" alignItems="center" mb={1}>
          <Typography sx={{ width: 180, mr: 1 }}>Binary Types:</Typography>
          {['bytes', 'bytearray', 'memoryview'].map((type) => (
            <Typography key={type} component="span" sx={typeStyle}>
              {type}
            </Typography>
          ))}
        </Box>

        {/* None Type */}
        <Box display="flex" alignItems="center" mb={1}>
          <Typography sx={{ width: 180, mr: 1 }}>None Type:</Typography>
          <Typography component="span" sx={typeStyle}>
            NoneType
          </Typography>
        </Box>
      </Box>

      <Typography variant="h5" fontWeight="bold" mb={1}>
        Getting the Data Type
      </Typography>
      <Typography>You can get the data type of any object by using the type( ) function:</Typography>
      <CodeBlock>{`x = 5
print(type(x))`}</CodeBlock>

      <Typography variant="h5" fontWeight="bold" mb={1}>
        Setting the Data Type
      </Typography>
      <Typography>In Python, the data type is set when you assign a value to a variable:</Typography>
      <CodeBlock>
        {`x = 10           # int
y = "Hello"      # str
z = 3.14         # float`}
      </CodeBlock>

      <Typography variant="h5" fontWeight="bold" mb={1}>
        Setting the Specific Data Type
      </Typography>
      <Typography>If you want to specify the data type, you can use the following constructor functions:</Typography>
      <CodeBlock>
        {`x = str("Hello World")
x = int(20)`}
      </CodeBlock>

      {/* quiz part */}
      <QuizGroup category="datatype" />
      <PaginationNav/>
    </Paper>
  );
};
const typeStyle = {
  fontFamily: 'monospace',
  backgroundColor: '#f5f5f5',
  color: '#d32f2f',
  px: 1,
  mx: 0.5,
};

export default DataTypes;
