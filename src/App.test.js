import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders loading text', () => {
  const { getByText } = render(<App />);
  const text = getByText(/Loading.../i);
  expect(text).toBeInTheDocument();
});
