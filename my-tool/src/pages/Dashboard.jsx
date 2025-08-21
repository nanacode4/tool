import { Grid, Typography, Divider } from '@mui/material';
import CourseCard from './../components/ui/CourseCard';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';


const Dashboard = () => {
  const navigate = useNavigate();
  const [progressData, setProgressData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    fetch('http://localhost:8000/api/learning-path/user_progress/summary/', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setProgressData(data); // { course: "Python" }
      })
      .catch(err => {
        console.error('Error fetching course progress:', err);
      });
  }, []);

  const courses = [
    {
      title: 'Python',
      level: 'Beginner',
      progress: progressData?.percentage || 0,
      image: require('./../assets/images/python.png'),
    },
    {
      title: 'SQL',
      level: 'Beginner',
      progress: 0,
      image: require('./../assets/images/sql.jpg'),
    },
    {
      title: 'Java',
      level: 'Beginner',
      progress: 0,
      image: require('./../assets/images/java.png'),
    },
    {
      title: 'Java Script',
      level: 'Beginner',
      progress: 0,
      image: require('./../assets/images/js1.jpg'),
    },
    {
      title: 'HTML',
      level: 'Beginner',
      progress: 0,
      image: require('./../assets/images/html_five.jpeg'),
    },
    {
      title: 'React',
      level: 'Beginner',
      progress: 0,
      image: require('./../assets/images/react.png'),
    },
    {
      title: 'C++',
      level: 'Beginner',
      progress: 0,
      image: require('./../assets/images/c.png'),
    },
    {
      title: 'c#',
      level: 'Beginner',
      progress: 0,
      image: require('./../assets/images/cc.png'),
    },
  ];
  

  return (
    <Grid container spacing={3} padding={3} mt={2} ml={3}>
      <Grid item xs={12}>
        <Typography variant="h4" fontWeight="bold">Dashboard</Typography>
        <Divider sx={{ my: 1, borderBottomWidth: 2 }} />
      </Grid>

      {courses.map((course, idx) => (
        <Grid item key={idx}>
          <CourseCard
            course={course}
            onClick={() => {
              if (course.title === 'Python') {
                navigate('/python');
              }
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};


export default Dashboard;
