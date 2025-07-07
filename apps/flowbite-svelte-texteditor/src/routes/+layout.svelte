<script lang="ts">
  import '../app.css';
  import { DarkMode, Navbar, NavBrand, NavLi, NavUl, NavHamburger, Sidebar, SidebarGroup, SidebarItem, SidebarButton, uiHelpers } from 'flowbite-svelte';
  import { ChartOutline, GridSolid, MailBoxSolid, UserSolid } from "flowbite-svelte-icons";
  import { page } from "$app/state";

  let { children } = $props();

  let activeUrl = $state(page.url.pathname);
  const demoSidebarUi = uiHelpers();
  let isDemoOpen = $state(false);
  const closeDemoSidebar = demoSidebarUi.close;
  $effect(() => {
    isDemoOpen = demoSidebarUi.isOpen;
    activeUrl = page.url.pathname;
  });
  const spanClass = "flex-1 ms-3 whitespace-nowrap";
  const activeClass = "flex items-center p-2 text-base font-normal text-white bg-primary-600 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-primary-800 dark:hover:bg-primary-800";
  const nonActiveClass = "flex items-center p-2 text-base font-normal text-green-900 rounded-lg dark:text-white hover:bg-green-100 dark:hover:bg-green-700";


</script>

<svelte:head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/base16/google-dark.min.css" />
</svelte:head>

<div class="mx-auto max-w-7xl px-2 mb-40">
  <Navbar>
    <NavBrand href="/">
      <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite-Svelte-Texteditor</span>
    </NavBrand>
    <NavHamburger />
    <NavUl>
      <NavLi href="/">Home</NavLi>
      <NavLi href="/autofocus">Autofocus</NavLi>
      <NavLi href="/draghandle">Draghandle</NavLi>
      <NavLi href="/editable-button">Editable</NavLi>
      <NavLi href="/toc">Toc</NavLi>
      <DarkMode class="p-0 md:ms-8" />
    </NavUl>
  </Navbar>
<SidebarButton onclick={demoSidebarUi.toggle} class="mb-2" />
<div class="relative">
  <Sidebar {activeUrl} backdrop={false} isOpen={isDemoOpen} closeSidebar={closeDemoSidebar} params={{ x: -50, duration: 50 }} {activeClass} {nonActiveClass} position="absolute" class="z-50 h-full">
    <SidebarGroup>
      <SidebarItem label="Autofocus" href="/autofocus" />
      <SidebarItem label="Bubble menu" {spanClass} href="/bubble-menu" />
      <SidebarItem label="Config" {spanClass} href="/config-ex" />
      <SidebarItem label="Drag handle" href="/drag-handle" />
      <SidebarItem label="Editable" href="/editable-button" />
      <SidebarItem label="Floating menu" href="/floating-menu" />
      <SidebarItem label="Full featured" href="/full-feature" />
      <SidebarItem label="Math" href="/math" />
      <SidebarItem label="Mention" href="/mention" />
      <SidebarItem label="ToC" href="/toc" />

    </SidebarGroup>
  </Sidebar>
  <div class="mx-auto px-8 md:ml-64">
    {@render children()}
  </div>
</div>
  
</div>
