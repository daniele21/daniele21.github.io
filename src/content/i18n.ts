import type { Locale, RootContent } from '../types/content';

import { siteMetadata as siteEn, navigation as navEn, socialLinks as socialEn } from './locales/en/site';
import { homeContent as homeEn } from './locales/en/home';
import { commonContent as commonEn } from './locales/en/common';
import { pillars as pillarsEn } from './locales/en/pillars';
import { applications as appsEn } from './locales/en/applications';
import { principles as principlesEn, enablements as enablementsEn, journeyLinks as journeyEn } from './locales/en/principles';
import { credibilityProofs as credibilityEn } from './locales/en/credibility';

export const DEFAULT_LOCALE: Locale = 'en';

const dictionaries: Record<Locale, RootContent> = {
  en: {
    site: siteEn,
    navigation: navEn,
    socialLinks: socialEn,
    home: homeEn,
    common: commonEn,
    pillars: pillarsEn,
    applications: appsEn,
    principles: principlesEn,
    journeyLinks: journeyEn,
    enablements: enablementsEn,
    credibilityProofs: credibilityEn,
  },
  // Future locales (e.g., 'it') will be registered here cleanly
  it: {
    site: siteEn,
    navigation: navEn,
    socialLinks: socialEn,
    home: homeEn,
    common: commonEn,
    pillars: pillarsEn,
    applications: appsEn,
    principles: principlesEn,
    journeyLinks: journeyEn,
    enablements: enablementsEn,
    credibilityProofs: credibilityEn,
  },
};

/**
 * Resolves the complete strongly-typed root content dictionary for the requested locale.
 * Defaults to 'en' if not specified or unavailable.
 */
export function getContent(locale: Locale = DEFAULT_LOCALE): RootContent {
  return dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
}
