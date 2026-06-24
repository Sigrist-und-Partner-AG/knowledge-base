export const COMPANY = {
  PORTAL: 'Knowledge Base',
  NAME: 'H. Sigrist & Partner AG',
  INITIALS: 'S&P',
  URL: {
    WEBSITE: 'https://www.dosiersysteme.ch',
    GITHUB: 'https://github.com/Sigrist-und-Partner-AG/knowledge-base',
    YOUTUBE: 'https://www.youtube.com/@HSigristPartnerAG',
    INSTAGRAM: 'https://www.instagram.com/dosiersysteme/'
  }
} as const;

export const LICENSE = {
  NAME: 'CC BY 4.0',
  URL: 'https://creativecommons.org/licenses/by/4.0/',
  COPYRIGHT: '2026'
} as const;

export const PRODUCTS = {
  C100: 'C100-4.0'
} as const;

/** Assign version badges to sidebar titles.
 *  By default, no version badge is shown. */
export const VERSIONS: Record<string, string> = {
  [PRODUCTS.C100]: 'v4.03'
} as const;
