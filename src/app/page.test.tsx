import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import HomePage from './page';

describe('HomePage', () => {
  it('renders the main heading', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { name: /welcome to studybuddy/i })
    ).toBeInTheDocument();
  });
}); 