import React from 'react';
import { render, screen } from '@testing-library/react';
import CodeBlock from './CodeBlock';

describe('CodeBlock Component', () => {
  test('renders code inside a <pre> block', () => {
    const code = `for (let i = 0; i < 5; i++) {\n  console.log(i);\n}`;

    render(<CodeBlock>{code}</CodeBlock>);

    const preElement = screen.getByText(/for \(let i = 0/i);
    expect(preElement).toBeInTheDocument();

    // Check if it is in a <pre> element
    expect(preElement.tagName.toLowerCase()).toBe('pre');
  });

  test('supports multiline code', () => {
    const code = `line1\nline2\nline3`;

    render(<CodeBlock>{code}</CodeBlock>);

    expect(screen.getByText(/line1/i)).toBeInTheDocument();
    expect(screen.getByText(/line2/i)).toBeInTheDocument();
    expect(screen.getByText(/line3/i)).toBeInTheDocument();
  });
});
