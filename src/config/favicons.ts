/**
 * Favicon Configuration & Resolution.
 * Defines custom icons per project page route while maintaining
 * site-wide defaults for the rest of the application.
 */

export interface FaviconConfig {
  /** Primary favicon path (relative to base URL, without leading slash) */
  href: string;
  /** MIME type, e.g. 'image/png' or 'image/svg+xml' */
  type: string;
  /** Optional secondary SVG icon */
  svgHref?: string;
  /** Apple Touch Icon path (relative to base URL, without leading slash) */
  appleTouchIcon?: string;
}

/**
 * Site-wide default favicon configuration.
 */
export const defaultFavicon: FaviconConfig = {
  href: 'favicon.png',
  type: 'image/png',
  svgHref: 'favicon.svg',
  appleTouchIcon: 'favicon.png',
};

/**
 * Dedicated favicon mapping for project routes.
 * Keys represent route paths / page slugs.
 */
export const projectFavicons: Record<string, FaviconConfig> = {
  // Harnex: Android Local LLM Harness
  'android-local-llm-harness': {
    href: 'images/harness/harness-app-icon-light.png',
    type: 'image/png',
    appleTouchIcon: 'images/harness/harness-app-icon-light.png',
  },
  // Korgis: Local LLM Server
  'local-llm-server': {
    href: 'images/local-llm-server/logo.png',
    type: 'image/png',
    appleTouchIcon: 'images/local-llm-server/logo.png',
  },
  // Performance Lab
  'performance-lab': {
    href: 'images/performance-lab/mark.svg',
    type: 'image/svg+xml',
    svgHref: 'images/performance-lab/mark.svg',
    appleTouchIcon: 'images/performance-lab/mark.png',
  },
  // RedactGuard
  'redact-guard': {
    href: 'images/redact-guard/logo.png',
    type: 'image/png',
    appleTouchIcon: 'images/redact-guard/logo.png',
  },
  // ClosedRoom
  'closedroom': {
    href: 'images/closedroom/logo.png',
    type: 'image/png',
    appleTouchIcon: 'images/closedroom/logo.png',
  },
  // Aura Finance
  'aura-finance': {
    href: 'images/aura/logo.png',
    type: 'image/png',
    appleTouchIcon: 'images/aura/logo.png',
  },
};

/**
 * Resolves the favicon configuration for a given pathname or manual override.
 *
 * @param pathname - Current URL pathname (e.g. Astro.url.pathname)
 * @param override - Optional manual override passed via page props
 * @returns Resolved FaviconConfig to render in <head>
 */
export function resolveFavicon(
  pathname: string,
  override?: string | Partial<FaviconConfig>
): FaviconConfig {
  if (typeof override === 'string') {
    const isSvg = override.endsWith('.svg');
    const cleanHref = override.replace(/^\/+/, '');
    return {
      href: cleanHref,
      type: isSvg ? 'image/svg+xml' : 'image/png',
      svgHref: isSvg ? cleanHref : undefined,
      appleTouchIcon: cleanHref,
    };
  }

  if (override && typeof override === 'object') {
    return {
      ...defaultFavicon,
      ...override,
      href: override.href ? override.href.replace(/^\/+/, '') : defaultFavicon.href,
      appleTouchIcon: override.appleTouchIcon
        ? override.appleTouchIcon.replace(/^\/+/, '')
        : defaultFavicon.appleTouchIcon,
    };
  }

  // Clean pathname by stripping slashes
  const cleanPath = pathname.replace(/^\/+|\/+$/g, '');
  const segments = cleanPath.split('/');
  const pageSlug = segments[segments.length - 1] || '';

  if (cleanPath && projectFavicons[cleanPath]) {
    return projectFavicons[cleanPath];
  }
  if (pageSlug && projectFavicons[pageSlug]) {
    return projectFavicons[pageSlug];
  }

  return defaultFavicon;
}
