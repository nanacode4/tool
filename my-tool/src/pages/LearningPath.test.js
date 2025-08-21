import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LearningPath from './LearningPath';

beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe('LearningPath Page', () => {
  test('renders all questions and radio options', () => {
    render(<LearningPath />);

    expect(screen.getByText(/Do you have programming experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Can you complete basic tasks/i)).toBeInTheDocument();
    expect(screen.getByText(/Are you familiar with data structures/i)).toBeInTheDocument();
    expect(screen.getByText(/Are you interested in a specific field/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/No experience/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Web Development/i)).toBeInTheDocument();
  });

  test('submits answers and shows recommendation', async () => {
    fetch.mockResolvedValueOnce({
      json: async () => ({ path: 'We recommend starting with Python basics and Web development.' }),
    });

    render(<LearningPath />);

    fireEvent.click(screen.getByLabelText(/No experience/i));
    fireEvent.click(screen.getByLabelText(/Yes, I can write simple programs/i));
    fireEvent.click(screen.getByLabelText(/Basic understanding \(sorting, searching\)/i));
    fireEvent.click(screen.getByLabelText(/Web Development/i));

    fireEvent.click(screen.getByRole('button', { name: /Get My Learning Path/i }));

    await waitFor(() => {
      expect(screen.getByText(/Recommended Learning Path/i)).toBeInTheDocument();
      expect(screen.getByText(/We recommend starting with Python/i)).toBeInTheDocument();
    });
  });
});
