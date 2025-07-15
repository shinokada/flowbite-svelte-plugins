<script lang="ts">
  import '../app.css';
  import { RunesMetaTags, deepMerge } from 'runes-meta-tags';
  import { DarkMode, Navbar, NavBrand, NavLi, NavUl, NavHamburger, Sidebar, SidebarGroup, SidebarItem, SidebarButton, uiHelpers } from 'flowbite-svelte';
  import { page } from '$app/state';

  let { children, data } = $props();

  const repositoryUrl = __GITHUBURL__.replace('git+', '');
  const version = __VERSION__;
  const examples: Array<{ label: string; path: string }> = data.allExamples || [];

  let activeUrl = $state(page.url.pathname);
  const demoSidebarUi = uiHelpers();
  let isDemoOpen = $state(false);
  const closeDemoSidebar = demoSidebarUi.close;

  // meta tag
  function buildMetaTags() {
    return page.data.pageMetaTags
      ? deepMerge(page.data.layoutMetaTags, page.data.pageMetaTags)
      : data.layoutMetaTags;
  }

  let metaTags = $state(buildMetaTags());
  $effect(() => {
    metaTags = buildMetaTags();
    isDemoOpen = demoSidebarUi.isOpen;
    activeUrl = page.url.pathname;
  });
  const activeClass = 'flex items-center p-1 text-base font-normal text-white bg-primary-600 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-800 dark:hover:bg-primary-800';
  const nonActiveClass = 'flex items-center p-1 text-base font-normal text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700';
</script>
<RunesMetaTags {...metaTags} />
<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/google-dark.min.css" />
</svelte:head>

<div class="mx-auto mb-40 max-w-7xl">
  <Navbar class="border-b border-gray-200 dark:border-gray-700">
    <NavBrand href="/">
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite-Svelte-Texteditor</span>
    </NavBrand>
    <NavHamburger />
    <NavUl>
      <NavLi href="/">Home</NavLi>
      <NavLi href={repositoryUrl} target="_blank">Github</NavLi>
      <NavLi href="https://flowbite-svelte.com/docs/plugins/wysiwyg" target="_blank">Docs</NavLi>
      <NavLi href="https://www.npmjs.com/package/@flowbite-svelte-plugins/texteditor?activeTab=versions" target="_blank">v{version}</NavLi>
      <DarkMode class="p-1 md:ms-8" />
    </NavUl>
  </Navbar>
  <SidebarButton onclick={demoSidebarUi.toggle} class="mb-2" />
  <div class="relative py-8">
    <Sidebar {activeUrl} backdrop={false} isOpen={isDemoOpen} closeSidebar={closeDemoSidebar} params={{ x: -50, duration: 50 }} {activeClass} {nonActiveClass} position="absolute" class="z-50 h-full border-r border-gray-200 dark:border-gray-700" divClass="bg-white pb-32">
      <SidebarGroup>
        {#each examples as { label, path }}
          <SidebarItem {label} href={path} />
        {/each}
      </SidebarGroup>
    </Sidebar>
    <div class="mx-auto px-8 md:ml-64">
      {@render children()}
    </div>
  </div>
</div>
