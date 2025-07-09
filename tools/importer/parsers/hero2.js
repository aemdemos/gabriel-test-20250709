/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main grid layout (contains image and content)
  const grid = element.querySelector('.grid-layout');
  let image = null;
  let content = null;
  if (grid) {
    const children = grid.querySelectorAll(':scope > *');
    for (let i = 0; i < children.length; i++) {
      if (children[i].tagName.toLowerCase() === 'img') {
        image = children[i];
      } else {
        content = children[i];
      }
    }
  }
  // Compose the block rows
  const rows = [];
  // Header row - must match example exactly
  rows.push(['Hero (hero2)']);
  // Second row: background image (optional)
  rows.push([image || '']);
  // Third row: content (title, subheading, cta)
  rows.push([content || '']);
  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
