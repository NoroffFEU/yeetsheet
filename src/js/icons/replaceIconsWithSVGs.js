import getIcon from '.';

/**
 * Replaces all HTML elements with the attribute `data-icon` with corresponding SVG icons.
 *
 * This function selects all elements in the document that have the `data-icon` attribute. For each
 * of these elements, it retrieves the icon name, size, and optional class from the dataset.
 * It then generates the corresponding SVG icon, parses it into an HTML element, and replaces the
 * original element with this new SVG element.
 *
 * The function `getIcon` returns an SVG string based on the provided parameters.
 *
 * @function replaceIconsWithSVGs
 *
 * @example
 * // HTML structure:
 * // <span data-icon="home" data-size="24" data-class="icon-home"></span>
 * // <span data-icon="settings" data-size="32" data-class="icon-settings"></span>
 * // <span data-icon="user" data-size="16" data-class="icon-user"></span>
 *
 * // JavaScript:
 * replaceIconsWithSVGs();
 */

export default function replaceIconsWithSVGs() {
  const iconSpans = document.querySelectorAll('[data-icon]');
  if (iconSpans) {
    iconSpans.forEach((i) => {
      const icon = getIcon(i.dataset.icon, i.dataset.size, i.dataset.class);
      const parser = new DOMParser();
      const svg = parser.parseFromString(icon, 'image/svg+xml');
      i.replaceWith(svg.children[0]);
    });
  }
}
