/* eslint-disable @typescript-eslint/no-explicit-any */
import 'server-only';
import type { Locale } from './middleware';

export type Dictionary = any;

// We enumerate all dictionaries here for better webpack/turbopack bundling
const dictionaries = {
  es: () => import('./dictionaries/es.json').then((module) => module.default),
  pt: () => import('./dictionaries/pt.json').then((module) => module.default),
  en: () => import('./dictionaries/en.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  // Return the locale if it exists, otherwise fallback to 'es'
  return dictionaries[locale]?.() ?? dictionaries.es();
};
