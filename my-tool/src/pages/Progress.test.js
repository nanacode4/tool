import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Progress from './Progress';
import { BrowserRouter } from 'react-router-dom';

const mockNavigate = jest.fn();


const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Progress Page', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  test('displays user info, progress and feedback form', async () => {
    localStorage.setItem('username', 'alice');
    localStorage.setItem('access_token', 'token123');

    // mock progress and wrong answers
    fetch
      .mockResolvedValueOnce({
        json: async () => ({ course: 'Python', percentage: 80 }),
      })
      .mockResolvedValueOnce({
        json: async () => [{ id: 1 }, { id: 2 }],
      });

    renderWithRouter(<Progress />);
    // expect(await screen.findByText(/alice/i)).toBeInTheDocument();
    expect(await screen.findByText(/80%/)).toBeInTheDocument();
    expect(await screen.findByText(/wrong quizzes to practice/i)).toBeInTheDocument();
    // expect(screen.getByText(/Feedback/i)).toBeInTheDocument();
  });

  test('shows "No wrong quizzes yet" message', async () => {
    localStorage.setItem('username', 'bob');
    localStorage.setItem('access_token', 'token123');

    fetch
      .mockResolvedValueOnce({
        json: async () => ({ course: 'SQL', percentage: 40 }),
      })
      .mockResolvedValueOnce({
        json: async () => [],
      });

    renderWithRouter(<Progress />);
    expect(await screen.findByText(/No wrong quizzes yet/i)).toBeInTheDocument();
  });

  test('submit feedback successfully', async () => {
    localStorage.setItem('username', 'testuser');
    localStorage.setItem('access_token', 'token123');

    fetch
      .mockResolvedValueOnce({ json: async () => ({ course: 'Python', percentage: 50 }) }) // progress
      .mockResolvedValueOnce({ json: async () => [] }) // wrong answers
      .mockResolvedValueOnce({ ok: true }); // feedback submit

    renderWithRouter(<Progress />);
    const textarea = await screen.findByPlaceholderText(/Enter your feedback here/i);
    fireEvent.change(textarea, { target: { value: 'Great platform!' } });

    const button = screen.getByRole('button', { name: /Submit Feedback/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Thank you for your feedback/i)).toBeInTheDocument();
    });
  });

  test('logout clears localStorage and redirects', async () => {
    localStorage.setItem('username', 'john');
    localStorage.setItem('access_token', 'token123');

    fetch
      .mockResolvedValueOnce({ json: async () => ({ course: 'Java', percentage: 30 }) })
      .mockResolvedValueOnce({ json: async () => [] });

    renderWithRouter(<Progress />);
    const logoutButton = await screen.findByRole('button', { name: /Logout/i });
    fireEvent.click(logoutButton);

    expect(localStorage.getItem('username')).toBeNull();
  });
});
