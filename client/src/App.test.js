import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Test Results', () => {
  render(<App />);
  const h2 = screen.getByText('Test Results');
  expect(h2).toBeInTheDocument();
});
