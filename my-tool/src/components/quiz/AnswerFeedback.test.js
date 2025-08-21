import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AnswerFeedback from './AnswerFeedback';

describe('AnswerFeedback Component', () => {
  test('displays correct feedback when answer is correct', () => {
    const onNext = jest.fn();

    render(<AnswerFeedback isCorrect={true} onNext={onNext} />);

    expect(screen.getByText(/Correct Answer!/i)).toBeInTheDocument();
    expect(screen.getByText(/Next Question/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Next Question/i));
    expect(onNext).toHaveBeenCalledTimes(1);
  });

  test('displays wrong feedback and explanation', () => {
    const onTryAgain = jest.fn();

    render(
      <AnswerFeedback
        isCorrect={false}
        correctText="Correct answer: Paris"
        onTryAgain={onTryAgain}
      />
    );

    expect(screen.getByText(/Wrong Answer!/i)).toBeInTheDocument();
    expect(screen.getByText(/Correct answer: Paris/i)).toBeInTheDocument();
    expect(screen.getByText(/Try Again/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Try Again/i));
    expect(onTryAgain).toHaveBeenCalledTimes(1);
  });

  test('renders "Add to Review" button if provided and answer is wrong', () => {
    const onAddToReview = jest.fn();

    render(
      <AnswerFeedback
        isCorrect={false}
        correctText="Correct answer: A"
        onTryAgain={() => {}}
        onAddToReview={onAddToReview}
      />
    );

    const addButton = screen.getByText(/Add to Review/i);
    expect(addButton).toBeInTheDocument();

    fireEvent.click(addButton);
    expect(onAddToReview).toHaveBeenCalledTimes(1);
  });

  test('does not render "Add to Review" if isCorrect is true', () => {
    render(<AnswerFeedback isCorrect={true} onNext={() => {}} />);
    expect(screen.queryByText(/Add to Review/i)).not.toBeInTheDocument();
  });
});
