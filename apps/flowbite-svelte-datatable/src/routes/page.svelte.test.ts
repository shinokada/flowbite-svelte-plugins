import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';

if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    enumerable: true,
    value: () => ({
      matches: false,
      media: '',
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false
    })
  });
}

describe('/+page.svelte', () => {
  test.skip('should render h1', async () => {
    const { default: Page } = await import('./+page.svelte');
    render(Page);
    expect(screen.getByRole('heading', { level: 1 })).toBeTruthy();
  });
});
