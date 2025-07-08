import { mount, unmount } from 'svelte';

interface RendererOptions {
  target: HTMLElement;
  props?: Record<string, any>;
}

class SvelteRenderer {
  id: string;
  component: any;
  instance: any;
  element: HTMLElement;
  currentProps: Record<string, any>;
  private isDestroyed: boolean = false;

  constructor(component: any, { target, props = {} }: RendererOptions) {
    this.id = Math.floor(Math.random() * 0xffffffff).toString(16);
    this.component = component;
    this.element = target;
    this.currentProps = props;

    this.render();
  }

  render(): void {
    if (this.isDestroyed) {
      console.warn('Cannot render destroyed SvelteRenderer');
      return;
    }

    try {
      if (this.instance) {
        unmount(this.instance);
        this.instance = null;
      }

      if (!this.element || !this.element.parentNode) {
        console.warn('Target element is not in DOM, skipping render');
        return;
      }

      this.instance = mount(this.component, {
        target: this.element,
        props: this.currentProps
      });
    } catch (error) {
      console.error('Error rendering Svelte component:', error);
    }
  }

  updateProps(newProps: Record<string, any>): void {
    if (this.isDestroyed) {
      console.warn('Cannot update props on destroyed SvelteRenderer');
      return;
    }

    const hasChanged = Object.keys(newProps).some((key) => this.currentProps[key] !== newProps[key]);

    if (hasChanged) {
      this.currentProps = { ...this.currentProps, ...newProps };
      this.render();
    }
  }

  updateProp(key: string, value: any): void {
    if (this.isDestroyed) {
      console.warn('Cannot update prop on destroyed SvelteRenderer');
      return;
    }

    if (this.currentProps[key] !== value) {
      this.currentProps[key] = value;
      this.render();
    }
  }

  getProps(): Record<string, any> {
    return { ...this.currentProps };
  }

  // New method to call component methods
  callMethod(methodName: string, ...args: any[]): any {
    if (this.isDestroyed || !this.instance) {
      console.warn(`Cannot call method ${methodName} on destroyed/unmounted SvelteRenderer`);
      return undefined;
    }

    try {
      if (typeof this.instance[methodName] === 'function') {
        return this.instance[methodName](...args);
      } else {
        console.warn(`Method ${methodName} not found on component instance`);
        return undefined;
      }
    } catch (error) {
      console.error(`Error calling method ${methodName}:`, error);
      return undefined;
    }
  }

  // Convenience methods for common TipTap plugin operations
  setup(): boolean {
    return this.callMethod('setup') ?? false;
  }

  cleanup(): boolean {
    return this.callMethod('cleanup') ?? false;
  }

  destroy(): void {
    if (this.isDestroyed) {
      return;
    }

    try {
      // Call cleanup if available before destroying
      this.cleanup();

      if (this.instance) {
        unmount(this.instance);
        this.instance = null;
      }
    } catch (error) {
      console.error('Error destroying Svelte component:', error);
    } finally {
      this.isDestroyed = true;
      this.currentProps = {};
    }
  }
}

export default SvelteRenderer;
