import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('お題の文字が画面に含まれるか', () => {
  render(<App />);
  const linkElement = screen.getByText(/お題/i);
  expect(linkElement).toBeInTheDocument();
});
