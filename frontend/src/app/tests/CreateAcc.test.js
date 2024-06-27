// src/components/CreateAccount.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import CreateAccount from './createAccount';

// Mock the next/router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CreateAccount', () => {
  it('renders the form and submits data', async () => {
    const push = jest.fn();
    useRouter.mockReturnValue({ push });

    render(<CreateAccount />);

    // Check if the form fields and button are rendered
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    // Mock the fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );

    // Simulate form submission
    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));

    // Wait for the fetch request to complete
    await screen.findByText(/create your account/i);

    // Check if fetch was called with the correct arguments
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:3000/users',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'testuser', password: 'password123' }),
      })
    );

    // Check if the router push function was called with the correct path
    expect(push).toHaveBeenCalledWith('/login');
  });
});
