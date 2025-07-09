/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid-layout div (holds both sides)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Identify the image and the content (the grid typically has 2 children)
  let imageEl = null;
  let contentEl = null;
  const children = Array.from(grid.children);
  children.forEach(child => {
    if (child.tagName === 'IMG') {
      imageEl = child;
    } else {
      contentEl = child;
    }
  });

  // Build the content cell (all children of contentEl in order)
  let contentRowContent = [];
  if (contentEl) {
    // Include each child node that is not just whitespace
    contentRowContent = Array.from(contentEl.childNodes).filter(n => {
      if (n.nodeType === Node.TEXT_NODE) {
        return n.textContent.trim().length > 0;
      }
      return true;
    });
  }

  // Compose the table according to the block documentation
  const cells = [
    ['Hero (hero29)'],
    [imageEl],
    [contentRowContent]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
