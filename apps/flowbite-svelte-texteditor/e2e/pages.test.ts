import { expect, test } from '@playwright/test';

test('index page has expected h1', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: '@flowbite-svelte-plugins/texteditor', level: 1 })).toBeVisible();
});

test('alignments page has expected h1', async ({ page }) => {
  await page.goto('/examples/Alignments');
  await expect(page.getByRole('heading', { name: 'Alignments', level: 1 })).toBeVisible();
});

test('AutoFocus page has expected h1', async ({ page }) => {
  await page.goto('/examples/AutoFocus');
  await expect(page.getByRole('heading', { name: 'AutoFocus', level: 1 })).toBeVisible();
});

test('BubbleMenu page has expected h1', async ({ page }) => {
  await page.goto('/examples/BubbleMenu');
  await expect(page.getByRole('heading', { name: 'Bubble Menu', level: 1 })).toBeVisible();
});

test('BubbleMenu2 page has expected h1', async ({ page }) => {
  await page.goto('/examples/BubbleMenu2');
  await expect(page.getByRole('heading', { name: 'Bubble Menu 2', level: 1 })).toBeVisible();
});

test('CharacterCount page has expected h1', async ({ page }) => {
  await page.goto('/examples/CharacterCount');
  await expect(page.getByRole('heading', { name: 'Character Count', level: 1 })).toBeVisible();
});

test('CustomButton page has expected h1', async ({ page }) => {
  await page.goto('/examples/CustomButton');
  await expect(page.getByRole('heading', { name: 'Custom Button', level: 1 })).toBeVisible();
});

test('CustomTextEditor page has expected h1', async ({ page }) => {
  await page.goto('/examples/CustomTextEditor');
  await expect(page.getByRole('heading', { name: 'Custom TextEditor', level: 1 })).toBeVisible();
});

test('Details page has expected h1', async ({ page }) => {
  await page.goto('/examples/Details');
  await expect(page.getByRole('heading', { name: 'Details', level: 1 })).toBeVisible();
});

test('DragHandle page has expected h1', async ({ page }) => {
  await page.goto('/examples/DragHandle');
  await expect(page.getByRole('heading', { name: 'Drag Handle', level: 1 })).toBeVisible();
});

test('EdiatableButton page has expected h1', async ({ page }) => {
  await page.goto('/examples/EditableButton');
  await expect(page.getByRole('heading', { name: 'Editable Button', level: 1 })).toBeVisible();
});

test('Emoji page has expected h1', async ({ page }) => {
  await page.goto('/examples/Emoji');
  await expect(page.getByRole('heading', { name: 'Emoji', level: 1 })).toBeVisible();
});

test('Export page has expected h1', async ({ page }) => {
  await page.goto('/examples/Export');
  await expect(page.getByRole('heading', { name: 'Export', level: 1 })).toBeVisible();
});

test('FileHandler page has expected h1', async ({ page }) => {
  await page.goto('/examples/FileHandler');
  await expect(page.getByRole('heading', { name: 'File Handler', level: 1 })).toBeVisible();
});

test('FloatingMenu page has expected h1', async ({ page }) => {
  await page.goto('/examples/FloatingMenu');
  await expect(page.getByRole('heading', { name: 'Floating Menu', level: 1 })).toBeVisible();
});

test('FloatingMenu2 page has expected h1', async ({ page }) => {
  await page.goto('/examples/FloatingMenu2');
  await expect(page.getByRole('heading', { name: 'Floating Menu 2', level: 1 })).toBeVisible();
});

test('Fonts page has expected h1', async ({ page }) => {
  await page.goto('/examples/Fonts');
  await expect(page.getByRole('heading', { name: 'Fonts', level: 1 })).toBeVisible();
});

test('Formats page has expected h1', async ({ page }) => {
  await page.goto('/examples/Formats');
  await expect(page.getByRole('heading', { name: 'Formats', level: 1 })).toBeVisible();
});

test('FullFeaturedTextEditor page has expected h1', async ({ page }) => {
  await page.goto('/examples/FullFeaturedTexteditor');
  await expect(page.getByRole('heading', { name: 'Full Featured Texteditor', level: 1 })).toBeVisible();
});

test('Heading page has expected h1', async ({ page }) => {
  await page.goto('/examples/Heading');
  await expect(page.getByRole('heading', { name: 'Heading', level: 1 })).toBeVisible();
});

test('Images page has expected h1', async ({ page }) => {
  await page.goto('/examples/Images');
  await expect(page.getByRole('heading', { name: 'Images', level: 1 })).toBeVisible();
});

test('Invisible page has expected h1', async ({ page }) => {
  await page.goto('/examples/Invisible');
  await expect(page.getByRole('heading', { name: 'Invisible', level: 1 })).toBeVisible();
});

test('Layouts page has expected h1', async ({ page }) => {
  await page.goto('/examples/Layouts');
  await expect(page.getByRole('heading', { name: 'Layouts', level: 1 })).toBeVisible();
});

test('Lists page has expected h1', async ({ page }) => {
  await page.goto('/examples/Lists');
  await expect(page.getByRole('heading', { name: 'Lists', level: 1 })).toBeVisible();
});

test('Math page has expected h1', async ({ page }) => {
  await page.goto('/examples/Math');
  await expect(page.getByRole('heading', { name: 'Math', level: 1 })).toBeVisible();
});

test('Mention page has expected h1', async ({ page }) => {
  await page.goto('/examples/Mention');
  await expect(page.getByRole('heading', { name: 'Mention', level: 1 })).toBeVisible();
});

test('Placeholder page has expected h1', async ({ page }) => {
  await page.goto('/examples/Placeholder');
  await expect(page.getByRole('heading', { name: 'Placeholder', level: 1 })).toBeVisible();
});

test('Sources page has expected h1', async ({ page }) => {
  await page.goto('/examples/Sources');
  await expect(page.getByRole('heading', { name: 'Sources', level: 1 })).toBeVisible();
});

test('Tables page has expected h1', async ({ page }) => {
  await page.goto('/examples/Tables');
  await expect(page.getByRole('heading', { name: 'Tables', level: 1 })).toBeVisible();
});

test('Task page has expected h1', async ({ page }) => {
  await page.goto('/examples/Task');
  await expect(page.getByRole('heading', { name: 'Task', level: 1 })).toBeVisible();
});

test('Toc page has expected h1', async ({ page }) => {
  await page.goto('/examples/Toc');
  await expect(page.getByRole('heading', { name: 'Toc', level: 1 })).toBeVisible();
});

test('UndoRedo page has expected h1', async ({ page }) => {
  await page.goto('/examples/UndoRedo');
  await expect(page.getByRole('heading', { name: 'UndoRedo', level: 1 })).toBeVisible();
});

test('Youtube page has expected h1', async ({ page }) => {
  await page.goto('/examples/Youtube');
  await expect(page.getByRole('heading', { name: 'Youtube', level: 1 })).toBeVisible();
});
