/* global WebImporter */
export default function parse(element, { document }) {
  // Find the immediate grid container (the columns block)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Table header must be a single cell (not multiple columns)
  const headerRow = ['Columns (columns32)'];

  // The next row is the columns contents, one cell per column
  const contentRow = columns.map(col => col);

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
