import { mount, unmount } from 'svelte';

interface RendererOptions {
  target: HTMLElement;
  props: Record<string, any>;
}

class SvelteRenderer {
  component: any;
  instance: any;
  target: HTMLElement;

  constructor(component: any, { target, props }: RendererOptions) {
    this.component = component;
    this.target = target;
    this.instance = mount(this.component, { target, props });
    // this.target.classList.add('svelte-renderer');
  }

  updateProps(props: Record<string, any>): void {
    if (this.instance && typeof this.instance.$set === 'function') {
      this.instance.$set(props);
    }
  }

  destroy(): void {
    unmount(this.instance);
  }
}

export default SvelteRenderer;
