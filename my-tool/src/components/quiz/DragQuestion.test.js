import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DragQuestion from './DragQuestion';

const mockQuestion = {
  question: 'Fill in the correct code:',
  codeParts: [
    { text: 'for', input: false },
    { text: '(', input: false },
    { input: true },
    { text: 'in', input: false },
    { input: true },
    { text: '):', input: false },
  ],
  answer: ['i', 'range(5)'],
  options: ['j', 'range(5)', 'i', '10'],
};

describe('DragQuestion Component', () => {
  test('renders question and all options', () => {
    render(<DragQuestion question={mockQuestion} />);

    expect(screen.getByText(/Fill in the correct code/i)).toBeInTheDocument();

    // Check if option button is rendered
    mockQuestion.options.forEach((opt) => {
      expect(screen.getByRole('button', { name: opt })).toBeInTheDocument();
    });
  });

  test('fills blanks and submits correct answer', () => {
    render(<DragQuestion question={mockQuestion} />);

    // Click i and then range(5)
    fireEvent.click(screen.getByRole('button', { name: 'i' }));
    fireEvent.click(screen.getByRole('button', { name: 'range(5)' }));

    
    const submitBtn = screen.getByRole('button', { name: /submit answer/i });
    expect(submitBtn).toBeEnabled();

    fireEvent.click(submitBtn);

    // After submitting, you should see the Correct Answer feedback
    expect(screen.getByText(/Correct Answer!/i)).toBeInTheDocument();
  });

  test('shows wrong answer feedback and explanation', () => {
    render(<DragQuestion question={mockQuestion} />);

    // Submit incorrect answer
    fireEvent.click(screen.getByRole('button', { name: 'j' }));
    fireEvent.click(screen.getByRole('button', { name: '10' }));

    const submitBtn = screen.getByRole('button', { name: /submit answer/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/Wrong Answer!/i)).toBeInTheDocument();
    expect(screen.getByText(/Correct answer:/i)).toBeInTheDocument();
  });
});
