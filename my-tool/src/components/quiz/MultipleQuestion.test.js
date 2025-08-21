import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MultipleQuestion from './MultipleQuestion';

const mockQuestion = {
  question: 'What is the capital of France?',
  options: ['Paris', 'Berlin', 'London'],
  answer: ['Paris'],
};

describe('MultipleQuestion Component', () => {
  test('renders question and options', () => {
    render(<MultipleQuestion question={mockQuestion} />);

    expect(screen.getByText(/What is the capital of France/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Paris')).toBeInTheDocument();
    expect(screen.getByLabelText('Berlin')).toBeInTheDocument();
    expect(screen.getByLabelText('London')).toBeInTheDocument();
  });

  test('submit button is disabled before selecting', () => {
    render(<MultipleQuestion question={mockQuestion} />);
    const submitBtn = screen.getByRole('button', { name: /submit answer/i });
    expect(submitBtn).toBeDisabled();
  });

  test('selecting option enables submit and shows feedback', () => {
    const onNext = jest.fn();
    const onAddToReview = jest.fn();

    render(
      <MultipleQuestion
        question={mockQuestion}
        onNext={onNext}
        onAddToReview={onAddToReview}
      />
    );

    // Select an option
    fireEvent.click(screen.getByLabelText('Paris'));
    const submitBtn = screen.getByRole('button', { name: /submit answer/i });
    expect(submitBtn).toBeEnabled();

    // Submit the answer
    fireEvent.click(submitBtn);

    // Should see correct feedback
    expect(screen.getByText(/correct answer/i)).toBeInTheDocument();
  });
});
