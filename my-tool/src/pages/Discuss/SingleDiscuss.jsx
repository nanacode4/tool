import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Chip, Stack, Divider, Paper, Button, TextField } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SingleDiscuss = () => {
  
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [newReply, setNewReply] = useState('');
  const username = localStorage.getItem('username') || 'Anonymous';

  useEffect(() => {
    
    fetch(`http://localhost:8000/api/discuss/all/`)
      .then((res) => res.json())
      .then((data) => {
        const selected = data.find((item) => item.id === parseInt(id));
        setPost(selected);
      });
  }, [id]);

  const handleSubmitReply = () => {
    if (newReply.trim() === '') return;

    fetch(`http://localhost:8000/api/discuss/${id}/reply/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        replier: username,
        content: newReply,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Reload current post
        fetch('http://localhost:8000/api/discuss/all/')
          .then((res) => res.json())
          .then((data) => {
            const updated = data.find((item) => item.id === parseInt(id));
            setPost(updated);
            setNewReply('');
          });
      })
      .catch((err) => console.error(err));
  };

  if (!post) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ maxWidth: 1000, mx: 'auto', mt: 4 }}>
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <Paper
          sx={{
            width: 50,
            height: 50,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            bgcolor: '#e0e0e0',
          }}
        >
          {post.username?.charAt(0).toUpperCase()}
        </Paper>
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {post.username}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Posted{' '}
            {new Date(post.time).toLocaleString(undefined, {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Typography>
        </Box>
      </Stack>

      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {post.title}
      </Typography>
      <ReactMarkdown
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                style={oneDark}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {post.description}
      </ReactMarkdown>

      <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
        {post.tags.map((tag, i) => (
          <Chip key={i} label={tag} />
        ))}
      </Stack>

      <Divider sx={{ my: 3 }} />
      <Typography variant="h6">Replies</Typography>
      <Stack spacing={2} mt={2}>
        {post.replies.length > 0 ? (
          post.replies.map((r, i) => (
            <Paper key={i} sx={{ p: 2, bgcolor: '#f9f9f9' }}>
              <Typography variant="subtitle2" fontWeight="bold" mb={0.5}>
                {r.replier}
              </Typography>
              <Typography variant="body2" mb={1}>
                {r.content}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(r.time).toLocaleString()}
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography>No replies yet.</Typography>
        )}
      </Stack>

      <Divider sx={{ my: 4 }} />
      <Typography variant="h6" gutterBottom>
        Post a Reply
      </Typography>
      <TextField
        fullWidth
        multiline
        minRows={3}
        variant="outlined"
        value={newReply}
        onChange={(e) => setNewReply(e.target.value)}
        placeholder="Write your reply here..."
        sx={{ mb: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSubmitReply}>
        Submit Reply
      </Button>
    </Box>
  );
};

export default SingleDiscuss;
