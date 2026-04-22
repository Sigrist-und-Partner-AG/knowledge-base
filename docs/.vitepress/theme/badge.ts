import { VERSIONS } from '../versions';

/** Queries the sidebar title and inserts the matching version badge.
 *  If no mapping exists for the title, no version badge is shown. */
function applyVersionBadges() {
  document
    .querySelectorAll<HTMLElement>('.VPSidebar .VPSidebarItem.level-0 > .item > h2.text')
    .forEach((heading) => {
      const sidebarTitle = heading.textContent?.trim() ?? '';
      const version = VERSIONS[sidebarTitle];
      if (version) {
        heading.dataset.version = version;
      } else {
        delete heading.dataset.version;
      }
    });
}

/* Apply the version badge on page load or after page changes. */
document.addEventListener('DOMContentLoaded', () => {
  applyVersionBadges();
  new MutationObserver(applyVersionBadges).observe(document.body, {
    childList: true,
    subtree: true
  });
});
