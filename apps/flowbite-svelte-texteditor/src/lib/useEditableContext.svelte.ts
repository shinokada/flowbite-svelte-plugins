// lib/utils/useEditableContext.svelte.ts
import { getContext } from 'svelte';
import { type ClassValue } from 'clsx';
import { cn, type EditableContext } from '$lib';

export function useEditableContext() {
  const editableContext = getContext<EditableContext>('isEditable');
  
  return {
    editableContext,
    
    // Helper function to create editable-aware handlers
    createEditableHandler: (handler: () => void, isEditableCtx: boolean) => {
      return () => {
        if (!isEditableCtx) return;
        handler();
      };
    },

    // Helper function to create editable-aware handlers with parameters
    createEditableHandlerWithParams: <T extends any[]>(handler: (...args: T) => void, isEditableCtx: boolean) => {
      return (...args: T) => {
        if (!isEditableCtx) return;
        handler(...args);
      };
    },

    // Helper function to create editable-aware button classes
    getEditableButtonClass: (isEditableCtx: boolean, baseClass: ClassValue, className?: ClassValue) => {
      return cn(
        baseClass,
        !isEditableCtx && 'opacity-50 cursor-not-allowed hover:bg-transparent hover:text-gray-500 dark:hover:bg-transparent dark:hover:text-gray-400',
        className
      );
    },

    // Predefined button class for common use case
    getDefaultButtonClass: (isEditableCtx: boolean, className?: ClassValue) => {
      return cn(
        'cursor-pointer rounded-sm p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white',
        !isEditableCtx && 'opacity-50 cursor-not-allowed hover:bg-transparent hover:text-gray-500 dark:hover:bg-transparent dark:hover:text-gray-400',
        className
      );
    }
  };
}