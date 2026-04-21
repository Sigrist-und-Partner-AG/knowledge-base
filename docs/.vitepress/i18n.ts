/** Locale subset for `themeConfig.search.options.translations`. */
type SearchLocale = {
  button: {
    buttonText: string,
    buttonAriaLabel: string
  },
  modal: {
    displayDetails: string,
    resetButtonTitle: string,
    backButtonTitle: string,
    noResultsText: string,
    footer: {
      selectText: string,
      selectKeyAriaLabel: string,
      navigateText: string,
      navigateUpKeyAriaLabel: string,
      navigateDownKeyAriaLabel: string,
      closeText: string,
      closeKeyAriaLabel: string
    }
  }
};

/** Locale subset to be merged into `themeConfig`. */
type ThemeLocale = {
  lightModeSwitchTitle: string,
  darkModeSwitchTitle: string,
  darkModeSwitchLabel: string,
  langMenuLabel: string,
  sidebarMenuLabel: string,
  returnToTopLabel: string,
  outline: {
    label: string
  },
  lastUpdated: {
    text: string,
    formatOptions: Intl.DateTimeFormatOptions
  },
  editLink: {
    text: string
  },
  docFooter: {
    prev: string,
    next: string
  },
  search: {
    options: {
      translations: SearchLocale
    }
  }
};

/** A locale defines a complete set of translation strings. */
export type Locale = {
  lang: string,
  label: string,
  themeConfig: ThemeLocale
};

/** Translation strings for English. */
export const english = {
  lang: 'en',
  label: 'English',
  themeConfig: {
    lightModeSwitchTitle: 'Switch to light theme',
    darkModeSwitchTitle: 'Switch to dark theme',
    darkModeSwitchLabel: 'Appearance',
    langMenuLabel: 'Change language',
    sidebarMenuLabel: 'Menu',
    returnToTopLabel: 'Return to top',
    outline: {
      label: 'On this page'
    },
    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'long',
        timeStyle: 'short',
        hour12: false
      }
    },
    editLink: {
      text: 'Edit this page'
    },
    docFooter: {
      prev: 'Previous page',
      next: 'Next page'
    },
    search: {
      options: {
        translations: {
          button: {
            buttonText: 'Search',
            buttonAriaLabel: 'Search'
          },
          modal: {
            displayDetails: 'Display detailed list',
            resetButtonTitle: 'Reset search',
            backButtonTitle: 'Close search',
            noResultsText: 'No results for',
            footer: {
              selectText: 'to select',
              selectKeyAriaLabel: 'enter',
              navigateText: 'to navigate',
              navigateUpKeyAriaLabel: 'up arrow',
              navigateDownKeyAriaLabel: 'down arrow',
              closeText: 'to close',
              closeKeyAriaLabel: 'escape'
            }
          }
        }
      }
    }
  }
} satisfies Locale;

/** Translation strings for German. */
export const german = {
  lang: 'de',
  label: 'Deutsch',
  themeConfig: {
    lightModeSwitchTitle: 'Zum hellen Design wechseln',
    darkModeSwitchTitle: 'Zum dunklen Design wechseln',
    darkModeSwitchLabel: 'Darstellung',
    langMenuLabel: 'Sprache wechseln',
    sidebarMenuLabel: 'Menü',
    returnToTopLabel: 'Zurück nach oben',
    outline: {
      label: 'Auf dieser Seite'
    },
    lastUpdated: {
      text: 'Zuletzt aktualisiert',
      formatOptions: {
        dateStyle: 'long',
        timeStyle: 'short',
        hour12: false
      }
    },
    editLink: {
      text: 'Diese Seite bearbeiten'
    },
    docFooter: {
      prev: 'Vorherige Seite',
      next: 'Nächste Seite'
    },
    search: {
      options: {
        translations: {
          button: {
            buttonText: 'Suche',
            buttonAriaLabel: 'Suche'
          },
          modal: {
            displayDetails: 'Details anzeigen',
            resetButtonTitle: 'Suche zurücksetzen',
            backButtonTitle: 'Suche schliessen',
            noResultsText: 'Keine Ergebnisse für',
            footer: {
              selectText: 'auswählen',
              selectKeyAriaLabel: 'Enter',
              navigateText: 'navigieren',
              navigateUpKeyAriaLabel: 'Pfeil nach oben',
              navigateDownKeyAriaLabel: 'Pfeil nach unten',
              closeText: 'schliessen',
              closeKeyAriaLabel: 'Escape'
            }
          }
        }
      }
    }
  }
} satisfies Locale;
