import { readFileSync } from 'node:fs';
import { defineConfig } from 'vitepress';
import { withResponsiveImages } from 'vitepress-plugin-responsive-images';
import { generateSidebar } from 'vitepress-sidebar';
import { COMPANY, LICENSE, PRODUCTS } from './globals';
import { type Locale, english, german } from './i18n';
import gitTimestamps from './timestamps.json';

/** Loads a TextMate grammar from disk, returning it as an object. */
function defineLanguage(name: string) {
  const file = new URL(`./grammars/${name}.json`, import.meta.url);
  const json = JSON.parse(readFileSync(file, 'utf8'));
  return { ...json, name };
}

/** Defines a sidebar configuration for a language and top-level section. */
function defineSidebar(lang: string, text: string) {
  const prefixPath = `${lang}/${text}`;
  return {
    documentRootPath: 'docs',
    scanStartPath: prefixPath,
    resolvePath: `/${prefixPath}/`,
    rootGroupText: text,
    capitalizeFirst: true,
    useTitleFromFrontmatter: true,
    useTitleFromFileHeading: true,
    useFolderTitleFromIndexFile: true,
    useFolderLinkFromIndexFile: true,
    sortMenusByFrontmatterOrder: true,
    collapseDepth: 2
  };
}

/** Defines a locale configuration specific to one language. */
function defineLocale(locale: Locale) {
  return {
    lang: locale.lang,
    label: locale.label,
    themeConfig: {
      socialLinks: [
        { icon: 'github', link: COMPANY.URL.GITHUB },
        { icon: 'youtube', link: COMPANY.URL.YOUTUBE },
        { icon: 'instagram', link: COMPANY.URL.INSTAGRAM }
      ],
      nav: [
        { text: 'Webshop', link: `${COMPANY.URL.WEBSITE}/${locale.lang}/` },
        { text: PRODUCTS.C100, link: `/${locale.lang}/${PRODUCTS.C100}/` }
      ],
      sidebar: generateSidebar([
        defineSidebar(locale.lang, PRODUCTS.C100)
      ]),
      footer: {
        message: `${locale.license} ${LICENSE.NAME}`,
        copyright: `Copyright © ${LICENSE.COPYRIGHT} ${COMPANY.NAME}`
      },
      ...locale.themeConfig
    }
  };
}

/** The complete configuration that takes effect. */
export default withResponsiveImages(
  defineConfig({
    head: [
      ['meta', { property: 'og:site_name', content: `${COMPANY.NAME} ${COMPANY.PORTAL}` }],
      ['meta', { name: 'author', content: COMPANY.NAME }],
      ['link', { rel: 'license', href: LICENSE.URL }]
    ],
    title: COMPANY.PORTAL,
    titleTemplate: `:title | ${COMPANY.INITIALS}`,
    description: `${COMPANY.NAME} ${COMPANY.PORTAL}`,
    base: '/docs/',
    cleanUrls: true,
    locales: {
      en: defineLocale(english),
      de: defineLocale(german)
    },
    themeConfig: {
      search: {
        provider: 'local' as const,
        options: {
          detailedView: true
        }
      },
      outline: {
        level: [2, 3]
      },
      lastUpdated: {
        formatOptions: {
          forceLocale: true
        }
      },
      editLink: {
        pattern: `${COMPANY.URL.GITHUB}/edit/master/docs/:path`
      }
    },
    markdown: {
      theme: {
        light: 'material-theme-lighter',
        dark: 'tokyo-night'
      },
      languages: [
        defineLanguage('c100')
      ],
      languageLabel: {
        c100: PRODUCTS.C100
      }
    },
    /* Prefer `lastUpdated` timestamps from `timestamps.json` over those
    * obtained directly from Git. This makes the build Nix-compatible. */
    transformPageData(pageData) {
      const timestamps: Record<string, number> = gitTimestamps;
      const seconds = timestamps[pageData.relativePath];
      if (seconds !== undefined) {
        const milliseconds = seconds * 1000;
        pageData.lastUpdated = milliseconds;
      }
    },
  })
);
