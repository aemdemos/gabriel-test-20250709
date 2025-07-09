/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout inside this section
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate children of the grid for reliable referencing
  const gridChildren = Array.from(grid.children);

  // Extract the main heading (expected as h2)
  const heading = grid.querySelector('h2');

  // Extract the intro/secondary text (e.g. "Taylor Brooks")
  const secondaryTextDiv = gridChildren.find(el => el.classList && el.classList.contains('paragraph-xl'));

  // Extract tags (optional, shown as .tag inside .flex-vertical)
  const tagsContainer = grid.querySelector('.flex-vertical');

  // Extract main rich text (paragraphs)
  const richTextDiv = grid.querySelector('.rich-text, .w-richtext');

  // Compose content cell (row 3): Order is heading, tags, secondaryText, paragraphs (as observed visually)
  // Only push elements that exist, maintaining order according to screenshot
  const contentElements = [];
  if (heading) contentElements.push(heading);
  if (tagsContainer) contentElements.push(tagsContainer);
  if (secondaryTextDiv) contentElements.push(secondaryTextDiv);
  if (richTextDiv) contentElements.push(richTextDiv);

  // Table rows: header, background image (none), content
  const rows = [
    ['Hero (hero31)'],
    [''], // No image/background asset in this section
    [contentElements]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
