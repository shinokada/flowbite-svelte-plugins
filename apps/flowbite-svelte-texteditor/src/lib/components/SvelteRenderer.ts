import { mount, unmount } from 'svelte';

interface RendererOptions {
  target: HTMLElement;
  props: Record<string, any>;
}

class SvelteRenderer {
  component: any;
  instance: any;
  target: HTMLElement;
  currentProps: Record<string, any>;

  constructor(component: any, { target, props }: RendererOptions) {
    this.component = component;
    this.target = target;
    this.currentProps = props;
    this.instance = mount(this.component, { target, props });
  }

  updateProps(newProps: Record<string, any>): void {
    // In Svelte 5, we need to unmount and remount to update props
    // since the new mount API doesn't return a component instance with $set
    if (this.instance) {
      unmount(this.instance);
      this.currentProps = { ...this.currentProps, ...newProps };
      this.instance = mount(this.component, {
        target: this.target,
        props: this.currentProps
      });
    }
  }

  destroy(): void {
    if (this.instance) {
      unmount(this.instance);
      this.instance = null;
    }
  }
}

export default SvelteRenderer;
