import { nextTick } from 'vue';
import type { Zoom } from 'medium-zoom';

/** Ensure only a single instance is active at a given time. */
let zoom: Zoom | undefined;

/** Attaches click-to-zoom behaviour to all images in the VitePress content area.
 *  Nothing happens if `window` does not exist yet. */
function applyZoom() {
  if (typeof window === 'undefined') {
    return;
  }
  nextTick(async () => {
    const { default: mediumZoom } = await import('medium-zoom');
    zoom?.detach();
    zoom = mediumZoom('.vp-doc img', {
      background: 'transparent',
      margin: 24
    });
  });
}

/** Sets up image zoom for the current page and future route changes. */
export function setupImageZoom() {
  applyZoom();
  return applyZoom;
}
