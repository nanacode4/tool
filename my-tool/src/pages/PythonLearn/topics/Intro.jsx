import { Typography, Paper, Box, Link } from '@mui/material';
import CodeBlock from '../../../components/ui/CodeBlock';
import PaginationNav from './../../../components/layout/PaginationNav';

const Intro = () => {
  return (
    <Paper sx={{ padding: 6 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Python Introduction
      </Typography>
      <Typography>
        Python is a high-level, interpreted programming language known for its simple syntax and readability. It was created by Guido van Rossum and
        first released in 1991. Python is dynamically type-checked and garbage-collected. It supports multiple programming paradigms, including
        structured (particularly procedural), object-oriented and functional programming. It is often described as a "batteries included" language due
        to its comprehensive standard library.
      </Typography>

      <Typography variant="h5" fontWeight="bold" gutterBottom mt={1}>
        Why Learn Python?
      </Typography>
      <ul>
        <li>
          <Typography>Easy to read and write.</Typography>
        </li>
        <li>
          <Typography>Great for beginners and professionals.</Typography>
        </li>
        <li>
          <Typography>Used in many fields: web development, data science, AI, automation, etc.</Typography>
        </li>
        <li>
          <Typography>Huge community support and tons of libraries.</Typography>
        </li>
      </ul>

      <Typography variant="h5" fontWeight="bold" gutterBottom mb={1}>
        How to Install Python
      </Typography>
      <Typography variant="h6">Step 1: Visit the Official Website</Typography>
      <Link href="https://www.python.org/" target="_blank" rel="noopener" sx={{ color: '#2196f3' }}>
        https://www.python.org/
      </Link>
      <Typography variant="h6">Step 2: Download Python</Typography>
      <ul>
        <li>
          <Typography>Click the “Downloads” tab and choose the right version for your OS (Windows, macOS, or Linux).</Typography>
        </li>
        <li>
          <Typography>Use the latest stable version (e.g., Python 3.12.x).</Typography>
        </li>
        <li>
          <Typography>Double-click the downloaded file.</Typography>
        </li>
        <li>
          <Typography>Click “Install Now”.</Typography>
        </li>
      </ul>
      <Typography variant="h6">Step 3: Verify Installation</Typography>
      <Typography>Open your Command Prompt (Windows) or Terminal (macOS/Linux), and type:</Typography>
      <Box component="pre" sx={{ background: '#111', color: '#fff', p: 1, borderRadius: 1, mt: 1 }}>
        python --version
      </Box>
      <Typography>You should see something like:</Typography>
      <Box component="pre" sx={{ background: '#111', color: '#fff', p: 1, borderRadius: 1, mt: 1 }}>
        Python 3.12.2
      </Box>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Run Your First Python Program
      </Typography>
      <Typography>
        Let’s write a simple Python file called <code>helloworld.py</code> in any text editor:
      </Typography>
      <CodeBlock>print("Hello, World!")</CodeBlock>
      <Typography>Save the file, open your command line, navigate to the folder where the file is located, and run:</Typography>
      <Box component="pre" sx={{ background: '#111', color: '#fff', p: 1, borderRadius: 1 }}>
        C:\Users\Your Name&gt; python helloworld.py
      </Box>
      <Typography>The output should be:</Typography>
      <Box component="pre" sx={{ background: '#111', color: '#fff', p: 1, borderRadius: 1 }}>
        Hello, World!
      </Box>
      <Typography>🎉 Congratulations! You’ve written and run your first Python program.</Typography>

      <Typography variant="h5" fontWeight="bold" gutterBottom mt={3}>
        Comments
      </Typography>
      <Typography>
        Python has commenting capability for the purpose of in-code documentation. Comments can be used to explain Python code. Comments can be used
        to make the code more readable. Comments can be used to prevent execution when testing code.
      </Typography>
      <Typography>Comments starts with a #, and Python will ignore them:</Typography>
      <CodeBlock>
        {`# This is a comment 
print("Hello, World!")`}
      </CodeBlock>
      <PaginationNav />
    </Paper>
  );
};

export default Intro;
