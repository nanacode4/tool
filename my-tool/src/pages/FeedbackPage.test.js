import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import FeedbackPage from './FeedbackPage';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

// Mock useNavigate
const mockNavigate = jest.fn();

describe('FeedbackPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });


  test('renders feedbacks if user is admin', async () => {
    localStorage.setItem('role', 'admin');
    fetch.mockResolvedValueOnce({
      json: async () => [
        {
          username: 'alice',
          created_at: new Date().toISOString(),
          content: 'Great platform!',
        },
      ],
    });

    renderWithRouter(<FeedbackPage />);
    expect(await screen.findByText(/Feedback/i)).toBeInTheDocument();
    expect(await screen.findByText(/alice/i)).toBeInTheDocument();
    expect(screen.getByText(/Great platform/i)).toBeInTheDocument();
  });

  test('shows no feedback message when empty', async () => {
    localStorage.setItem('role', 'admin');
    fetch.mockResolvedValueOnce({
      json: async () => [],
    });

    renderWithRouter(<FeedbackPage />);
    expect(await screen.findByText(/no feedback submitted/i)).toBeInTheDocument();
  });

  test('handles fetch error gracefully', async () => {
    console.error = jest.fn(); // mute expected console
    localStorage.setItem('role', 'admin');
    fetch.mockRejectedValueOnce(new Error('Network error'));

    renderWithRouter(<FeedbackPage />);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});
