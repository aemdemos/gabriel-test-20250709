/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per guidelines
  const rows = [['Hero (hero33)']];

  // Find image (background/hero image)
  const img = element.querySelector('img');
  rows.push([img || '']);

  // Get the grid layout containing the content area
  const grid = element.querySelector('.w-layout-grid');
  let content = '';
  if (grid) {
    // Look for the right-content area
    // Typically the div with id starting with 'w-node-'
    // It contains eyebrow, tag, heading, and meta info
    const contentDiv = Array.from(grid.children).find((child) =>
      child.matches('div') && child.querySelector('.h2-heading')
    );
    if (contentDiv) content = contentDiv;
  }
  rows.push([content || '']);

  // Create the table and replace the original section
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
