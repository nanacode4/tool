import React from 'react';
import { Card, CardContent, Typography, Button, LinearProgress, Box, Stack, CardMedia } from '@mui/material';

const CourseCard = ({ course, onClick }) => {
  const { title, level, progress, image } = course;

  return (
    <Card
      variant="outlined"
      sx={{
        width: 350,
        height: 360,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardMedia component="img" height="150" image={image} alt="Course Cover" />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mt: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: '#656767', mt: 0.5, mb: 2 }}>
          {level}
        </Typography>

        {progress !== undefined ? (
          <>
            <Box>
              <LinearProgress variant="determinate" value={progress} />
              <Typography variant="caption">{progress}%</Typography>
            </Box>
          </>
        ) : null}
      </CardContent>

      <Box sx={{ p: 2 }}>
        {progress !== undefined && progress > 0 ? (
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#7ca2ca ',
              color: '#fff',
            }}
            fullWidth
            onClick={onClick}
          >
            Continue
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#7ca2ca',
              color: '#fff',
            }}
            fullWidth
            onClick={onClick}
          >
            Start
          </Button>
        )}
      </Box>
    </Card>
  );
};

export default CourseCard;
