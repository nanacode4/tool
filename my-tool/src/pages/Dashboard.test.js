import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Dashboard from './Dashboard';
import { BrowserRouter } from 'react-router-dom';

jest.mock('./../components/ui/CourseCard', () => ({ course, onClick }) => (
  <div onClick={onClick} data-testid="course-card">
    {course.title} - {course.progress}%
  </div>
));

// Mock fetch
global.fetch = jest.fn();

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Dashboard Page', () => {
  beforeEach(() => {
    fetch.mockReset();
    localStorage.setItem('access_token', 'mocked_token');
  });


  test('handles fetch error gracefully', async () => {
    console.error = jest.fn(); // mute expected error log
    fetch.mockRejectedValueOnce(new Error('API Error'));

    renderWithRouter(<Dashboard />);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });
});
