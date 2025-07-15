const json = (r: Response) => r.json();
import type { LayoutServerLoad } from './$types';
import type { MetaProps } from 'runes-meta-tags';
import { metaTitle, metaDescription, metaImg } from 'runes-meta-tags';

export const load: LayoutServerLoad = async ({ fetch, url }) => {
  try {
    // Server-side data fetching
    const allExamples = await fetch('/api').then(json);
    
    // Meta tags generation
    const title = 'Flowbite-Svelte-TextEditor';
    const basicDesc = 'Tiptap powered text editor for Svelte';
    const description = metaDescription(url.pathname, basicDesc);
    const image = metaImg(url.pathname, __NAME__);

    const layoutMetaTags: MetaProps = {
      title,
      description,
      keywords: 'svelte, sveltekit, tiptap, flowbite-svelte',
      twitter: {
        card: 'summary_large_image',
        site: 'https://flowbite-svelte-texteditor.vercel.app/',
        creator: '@shinokada',
        title,
        description,
        image,
        imageAlt: title
      },
      og: {
        type: 'website',
        title,
        description,
        url: url.href,
        image,
        imageAlt: title,
        siteName: title,
        imageWidth: '1200',
        imageHeight: '630'
      }
    };

    return {
      allExamples,
      layoutMetaTags
    };
  } catch (error) {
    console.error(`Error in load function for /: ${error}`);
    
    // Return meta tags even if API call fails
    const title = metaTitle(url.pathname, __NAME__);
    const basicDesc = 'Meta tags for Runes.';
    const description = metaDescription(url.pathname, basicDesc);
    const image = metaImg(url.pathname, __NAME__);

    const layoutMetaTags: MetaProps = {
      title,
      description,
      keywords: 'runes, meta, tags',
      twitter: {
        card: 'summary_large_image',
        site: '@johndoe',
        creator: '@johndoe',
        title,
        description,
        image,
        imageAlt: title
      },
      og: {
        type: 'website',
        title,
        description,
        url: url.href,
        image,
        imageAlt: title,
        siteName: 'Runes meta',
        imageWidth: '1200',
        imageHeight: '630'
      }
    };

    return {
      allExamples: null, // or empty array []
      layoutMetaTags
    };
  }
};
