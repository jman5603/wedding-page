import { render, screen } from '@testing-library/react';
import App from './App';

test('renders wedding text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Jacob and Juliette's Wedding/i);
  expect(linkElement).toBeInTheDocument();
});
