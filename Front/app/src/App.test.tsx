import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('お題セットボタンがあるか', () => {
  render(<App />);
  const linkElement = screen.getByText(/お題をボードにセットする/i);
  expect(linkElement).toBeInTheDocument();
});
