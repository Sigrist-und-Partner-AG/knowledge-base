import { defineConfig } from 'vitepress';
import { generateSidebar } from 'vitepress-sidebar';
import { type Locale, english } from './i18n';

/** Defines a sidebar configuration for a language and top-level section. */
function defineSidebar(lang: string, text: string) {
  const prefixPath = `${lang}/${text}`;
  return {
    documentRootPath: 'docs',
    scanStartPath: prefixPath,
    resolvePath: `/${prefixPath}/`,
    rootGroupText: text,
    useTitleFromFileHeading: true,
    capitalizeEachWords: true,
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
        { icon: 'github', link: 'https://github.com/Sigrist-und-Partner-AG/knowledge-base' },
        { icon: 'youtube', link: 'https://www.youtube.com/@HSigristPartnerAG' },
        { icon: 'instagram', link: 'https://www.instagram.com/dosiersysteme/' }
      ],
      nav: [
        { text: 'Webshop', link: 'https://dosiersysteme.ch' },
        { text: 'C100-4.0', link: `/${locale.lang}/C100-4.0/` }
      ],
      sidebar: generateSidebar([
        defineSidebar(locale.lang, 'C100-4.0')
      ]),
      footer: {
        copyright: '© 2026 H. Sigrist & Partner AG'
      },
      ...locale.themeConfig
    }
  };
}

/** The complete configuration that takes effect. */
export default defineConfig({
  title: 'Knowledge Base',
  description: 'H. Sigrist & Partner Knowledge Base',
  locales: {
    en: defineLocale(english)
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
      pattern: 'https://github.com/Sigrist-und-Partner-AG/knowledge-base/edit/master/docs/:path'
    }
  },
  cleanUrls: true
});
