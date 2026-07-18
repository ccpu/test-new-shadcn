import { render, screen } from '@testing-library/react';
import React from 'react';
import { describe, expect, it } from 'vitest';
import Page from '../../src/app/page';

describe('home Page', () => {
  it('should pass a simple truthy test', () => {
    expect(true).toBe(true);
  });

  it('should render the Page component without crashing', () => {
    const { container } = render(<Page />);
    expect(container).toBeTruthy();
  });

  it('should render page with correct content', () => {
    render(<Page />);

    // Check for main content text
    expect(screen.getByText(/Get started by editing/u)).toBeDefined();
    expect(screen.getByText('Save and see your changes instantly.')).toBeDefined();
    expect(
      screen.getByText('Deploy to Cloudflare Workers with zero configuration.'),
    ).toBeDefined();

    // Check that the page contains links (without being specific about counts)
    expect(screen.getByText('/analytics')).toBeDefined();
    expect(screen.getByText('Read Next.js docs')).toBeDefined();
    expect(screen.getByText('Cloudflare Workers')).toBeDefined();
  });
});
