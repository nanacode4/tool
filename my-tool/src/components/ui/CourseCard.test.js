import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CourseCard from './CourseCard';

const mockCourse = {
  title: 'Intro to Python',
  level: 'Beginner',
  progress: 70,
  image: 'https://example.com/image.jpg',
};

describe('CourseCard Component', () => {
  test('renders course details correctly', () => {
    render(<CourseCard course={mockCourse} onClick={() => {}} />);

    expect(screen.getByText(/Intro to Python/i)).toBeInTheDocument();
    expect(screen.getByText(/Beginner/i)).toBeInTheDocument();
    expect(screen.getByText(/70%/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Continue/i })).toBeInTheDocument();
  });

  test('shows "Start" when progress is 0', () => {
    render(<CourseCard course={{ ...mockCourse, progress: 0 }} onClick={() => {}} />);
    expect(screen.getByRole('button', { name: /Start/i })).toBeInTheDocument();
  });

  test('hides progress when progress is undefined', () => {
    render(<CourseCard course={{ ...mockCourse, progress: undefined }} onClick={() => {}} />);
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });

  test('triggers onClick when button is clicked', () => {
    const handleClick = jest.fn();
    render(<CourseCard course={mockCourse} onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
