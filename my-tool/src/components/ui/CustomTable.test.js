import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomTable from './CustomTable';

const mockColumns = [
  { label: 'Name', key: 'name' },
  { label: 'Age', key: 'age' },
  { label: 'Code', key: 'code', monospace: true },
  { label: 'Op', key: 'operator' },
];

const mockRows = [
  { name: 'Alice', age: 25, code: 'x=1', operator: '===' },
  { name: 'Bob', age: 30, code: 'y=2', operator: '!==' },
];

describe('CustomTable Component', () => {
  test('renders column headers', () => {
    render(<CustomTable columns={mockColumns} rows={mockRows} />);
    mockColumns.forEach((col) => {
      expect(screen.getByText(col.label)).toBeInTheDocument();
    });
  });

  test('renders row values correctly', () => {
    render(<CustomTable columns={mockColumns} rows={mockRows} />);
    mockRows.forEach((row) => {
      expect(screen.getByText(row.name)).toBeInTheDocument();
      expect(screen.getByText(String(row.age))).toBeInTheDocument();
      expect(screen.getByText(row.code)).toBeInTheDocument();
      expect(screen.getByText(row.operator)).toBeInTheDocument();
    });
  });

  test('renders operator with monospace + styled box', () => {
    render(<CustomTable columns={mockColumns} rows={mockRows} />);
    const operator = screen.getByText('===');
    expect(operator).toBeInTheDocument();
    expect(operator).toHaveStyle({ fontFamily: 'monospace' });
  });

  test('renders monospace code correctly', () => {
    render(<CustomTable columns={mockColumns} rows={mockRows} />);
    const code = screen.getByText('x=1');
    expect(code).toBeInTheDocument();
    expect(code).toHaveStyle({ fontFamily: 'monospace' });
  });
});
