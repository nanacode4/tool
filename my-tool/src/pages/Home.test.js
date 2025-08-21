import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';

const mockNavigate = jest.fn();

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders main titles and button', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText(/Programming tutorials for beginners/i)).toBeInTheDocument();
    expect(screen.getByText(/Learn Python, Java/i)).toBeInTheDocument();

  });


  test('renders all features in the second section', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText(/Tailored to you/i)).toBeInTheDocument();
    expect(screen.getByText(/Bite-sized/i)).toBeInTheDocument();
    expect(screen.getByText(/It is promising/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Technical skills are in high demand/i)
    ).toBeInTheDocument();
  });
});
