import { mount, unmount } from 'svelte';

interface RendererOptions {
  target: HTMLElement;
  props: Record<string, any>;
}

class SvelteRenderer {
  id: string;
  component: any;
  instance: any;
  element: HTMLElement;
  currentProps: Record<string, any>;

  constructor(component: any, { target, props }: RendererOptions) {
    this.id = Math.floor(Math.random() * 0xffffffff).toString();
    this.component = component;
    this.element = target;
    this.currentProps = props;
    
    // Always render immediately, just like React renderer
    this.render();
  }

  render(): void {
    // Unmount existing instance if it exists
    if (this.instance) {
      unmount(this.instance);
    }
    
    // Mount the component
    this.instance = mount(this.component, {
      target: this.element,
      props: this.currentProps
    });
  }

  updateProps(newProps: Record<string, any>): void {
    this.currentProps = { ...this.currentProps, ...newProps };
    this.render();
  }

  destroy(): void {
    if (this.instance) {
      unmount(this.instance);
      this.instance = null;
    }
  }
}

export default SvelteRenderer;