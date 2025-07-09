/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must exactly match the example
  const headerRow = ['Hero (hero7)'];

  // Row 2: Background Image (none in this case)
  const imageRow = [''];

  // Row 3: Title (h2), subheading (p), CTA (a)
  // Find the main grid layout
  const grid = element.querySelector('.grid-layout') || element.querySelector('.w-layout-grid');
  let title, subheading, cta;
  if (grid) {
    // Title is the first h2 inside the grid
    title = grid.querySelector('h2');
    // The content block is the first div (not the grid itself)
    const textCol = grid.querySelector('div');
    if (textCol) {
      // Subheading is the first p in this column
      subheading = textCol.querySelector('p');
      // CTA is the first a in this column
      cta = textCol.querySelector('a');
    }
  }

  // Build content row, preserving order and skipping missing
  const row3Content = [];
  if (title) row3Content.push(title);
  if (subheading) row3Content.push(subheading);
  if (cta) row3Content.push(cta);

  // Always provide an array for row content
  const textRow = [row3Content];

  const cells = [headerRow, imageRow, textRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
