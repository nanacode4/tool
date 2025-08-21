import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GreyTextField from './GreyTextField';

describe('GreyTextField Component', () => {
  test('renders with placeholder and value', () => {
    render(<GreyTextField value="test" onChange={() => {}} placeholder="Enter something" />);
    const input = screen.getByPlaceholderText(/enter something/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('test');
  });

  test('calls onChange when typing', () => {
    const handleChange = jest.fn();
    render(<GreyTextField value="" onChange={handleChange} placeholder="Type here" />);

    const input = screen.getByPlaceholderText(/type here/i);
    fireEvent.change(input, { target: { value: 'hello' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test('applies custom width style', () => {
    render(<GreyTextField value="" onChange={() => {}} width={150} />);
    const input = screen.getByRole('textbox');
    expect(input.parentElement).toHaveStyle('width: 150px');
  });
});
