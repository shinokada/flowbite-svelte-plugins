import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
  it('should render h1', () => {
    render(Page);

    expect(screen.getByRole('heading', { level: 1, name: /flowbite-svelte-texteditor/i })).toBeInTheDocument();
  });
});
