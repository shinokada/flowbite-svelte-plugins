import tailwindcss from '@tailwindcss/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import pkg from './package.json' with { type: 'json' };
import tiptapPackage from './node_modules/@tiptap/core/package.json' with { type: 'json' };

export default defineConfig({
  plugins: [tailwindcss(), devtoolsJson(), sveltekit()],
  define: {
		__NAME__: JSON.stringify(pkg.name),
		__VERSION__: JSON.stringify(pkg.version),
		__GITHUBURL__: JSON.stringify(pkg.repository.url),
		__TIPTAP__: JSON.stringify(tiptapPackage.version),
	},
  test: {
    projects: [
      {
        extends: './vite.config.ts',
        plugins: [svelteTesting()],
        test: {
          name: 'client',
          environment: 'jsdom',
          clearMocks: true,
          include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
          exclude: ['src/lib/server/**'],
          setupFiles: ['./vitest-setup-client.ts']
        }
      },
      {
        extends: './vite.config.ts',
        test: {
          name: 'server',
          environment: 'node',
          include: ['src/**/*.{test,spec}.{js,ts}'],
          exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
        }
      }
    ]
  }
});
