<script lang="ts">
  import '../app.css';
  import { DarkMode, Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
  let { children } = $props();
</script>

<div class="mx-auto max-w-5xl px-2 mb-40">
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

  {@render children()}
</div>
