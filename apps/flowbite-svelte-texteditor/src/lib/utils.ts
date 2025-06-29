import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { type BubbleMenuConfig, type FloatingMenuConfig } from '$lib';

/**
 * Combines clsx and tailwind-merge for intelligent class merging
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Generates a random string of specified length using base36 characters
 * @param length - Length of the random string (default: 9)
 * @returns Random string
 */
export function generateRandomId(length: number = 9): string {
  return Math.random()
    .toString(36)
    .substring(2, 2 + length);
}

/**
 * Generates a unique ID with a given prefix
 * @param prefix - The prefix for the ID
 * @param length - Length of the random part (default: 9)
 * @returns Unique ID string with format: prefix_randomString
 */
export function generateUniqueId(prefix: string, length: number = 9): string {
  return `${prefix}_${generateRandomId(length)}`;
}

/**
 * Specific function for generating unique button IDs
 * @param buttonType - Type of button (e.g., 'toggleFontFamily', 'toggleBold', etc.)
 * @param length - Length of the random part (default: 9)
 * @returns Unique button ID
 */
export function generateButtonId(buttonType: string, length: number = 9): string {
  return generateUniqueId(`${buttonType}Button`, length);
}

export function getMenuConfig(config: boolean | BubbleMenuConfig | FloatingMenuConfig): BubbleMenuConfig | FloatingMenuConfig {
  if (typeof config === 'boolean') {
    return config ? {} : {}; // Return default config or empty
  }
  return config;
}