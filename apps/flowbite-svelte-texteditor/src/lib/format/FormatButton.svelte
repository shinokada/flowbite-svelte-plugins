<script lang="ts">
  import { Tooltip } from 'flowbite-svelte';
  import { type FormatButtonProps, cn } from '$lib';

  let { editor, format, tooltipText, buttonId, ariaLabel, class: className, ...restProps }: FormatButtonProps = $props();

  function handleClick() {
    switch (format) {
      case 'bold':
        editor?.chain().focus().toggleBold().run();
        break;
      case 'italic':
        editor?.chain().focus().toggleItalic().run();
        break;
      case 'underline':
        editor?.chain().focus().toggleUnderline().run();
        break;
      case 'strike':
        editor?.chain().focus().toggleStrike().run();
        break;
      case 'highlight':
        editor?.chain().focus().toggleHighlight().run();
        break;
      case 'code':
        editor?.chain().focus().toggleCode().run();
        break;
      case 'subscript':
        editor?.chain().focus().toggleSubscript().run();
        break;
      case 'superscript':
        editor?.chain().focus().toggleSuperscript().run();
        break;
      case 'link':
        const url = window.prompt('URL');
        if (url) {
          editor?.chain().focus().toggleLink({ href: url }).run();
        }
        break;
      case 'removeLink':
        editor?.chain().focus().unsetLink().run();
        break;
      case 'fontFamily':
        break;
      case 'fontSize':
        break;
    }
  }

  // SVG paths for different formats
  const svgPaths = {
    bold: 'M8 5h4.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0-7H6m2 7h6.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0 0H6',
    italic: 'm8.874 19 6.143-14M6 19h6.33m-.66-14H18',
    underline: 'M6 19h12M8 5v9a4 4 0 0 0 8 0V5M6 5h4m4 0h4',
    strike: 'M7 6.2V5h12v1.2M7 19h6m.2-14-1.677 6.523M9.6 19l1.029-4M5 5l6.523 6.523M19 19l-7.477-7.477',
    highlight: 'M9 19.2H5.5c-.3 0-.5-.2-.5-.5V16c0-.2.2-.4.5-.4h13c.3 0 .5.2.5.4v2.7c0 .3-.2.5-.5.5H18m-6-1 1.4 1.8h.2l1.4-1.7m-7-5.4L12 4c0-.1 0-.1 0 0l4 8.8m-6-2.7h4m-7 2.7h2.5m5 0H17',
    code: 'm8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14',
    link: 'M13.213 9.787a3.391 3.391 0 0 0-4.795 0l-3.425 3.426a3.39 3.39 0 0 0 4.795 4.794l.321-.304m-.321-4.49a3.39 3.39 0 0 0 4.795 0l3.424-3.426a3.39 3.39 0 0 0-4.794-4.795l-1.028.961',
    removeLink:
      'M13.2 9.8a3.4 3.4 0 0 0-4.8 0L5 13.2A3.4 3.4 0 0 0 9.8 18l.3-.3m-.3-4.5a3.4 3.4 0 0 0 4.8 0L18 9.8A3.4 3.4 0 0 0 13.2 5l-1 1m7.4 14-1.8-1.8m0 0L16 16.4m1.8 1.8 1.8-1.8m-1.8 1.8L16 20',
    subscript: 'M19.9999 21h-4v-.5c1.0989-1.0329 3.75-2.5 3.75-3.5v-1.0001c0-.5523-.4477-.9999-1-.9999h-1.75c-.5523 0-1 .4477-1 1M3.99986 6l9.26894 11.5765M13.1219 6 3.85303 17.5765',
    superscript:
      'M21.0002 11h-4l-.0001-.5C18.099 9.46711 20.7502 8 20.7502 7V5.99989c0-.55228-.4478-.99989-1-.99989h-1.75c-.5523 0-1 .44772-1 1M5.37837 7.98274 14.6473 19.5593m-.5251-11.25583L4.85547 19.8773',
    fontFamily:
      'm10.6 19 4.298-10.93a.11.11 0 0 1 .204 0L19.4 19m-8.8 0H9.5m1.1 0h1.65m7.15 0h-1.65m1.65 0h1.1m-7.7-3.985h4.4M3.021 16l1.567-3.985m0 0L7.32 5.07a.11.11 0 0 1 .205 0l2.503 6.945h-5.44Z',
    textColor:
      'm6.532 15.982 1.573-4m-1.573 4h-1.1m1.1 0h1.65m-.077-4 2.725-6.93a.11.11 0 0 1 .204 0l2.725 6.93m-5.654 0H8.1m.006 0h5.654m0 0 .617 1.569m5.11 4.453c0 1.102-.854 1.996-1.908 1.996-1.053 0-1.907-.894-1.907-1.996 0-1.103 1.907-4.128 1.907-4.128s1.909 3.025 1.909 4.128Z',
    fontSize: 'M3 6.2V5h11v1.2M8 5v14m-3 0h6m2-6.8V11h8v1.2M17 11v8m-1.5 0h3'
  };
</script>

<button
  onclick={handleClick}
  {...restProps}
  id={buttonId}
  type="button"
  class={cn('cursor-pointer rounded-sm p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white', className)}
>
  <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={svgPaths[format]} />
  </svg>
  <span class="sr-only">{ariaLabel}</span>
</button>
<Tooltip>{tooltipText}</Tooltip>

<!--
@component
[Go to docs](https://flowbite-svelte.com/docs/plugins/WYSIWYG)
## Type
[FormatButtonProps](https://github.com/shinokada/flowbite-svelte-plugins/blob/main/src/lib/types.ts#L97)
## Props
@prop editor
@prop format
@prop tooltipText
@prop buttonId
@prop ariaLabel
@prop class: className
@prop ...restProps
-->
