/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout that represents the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate child elements of the grid as columns
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // The header row must have a single cell, even if the content row has multiple columns
  const headerRow = ['Columns (columns11)'];
  const contentRow = columns;

  // Create the table data: one header cell, then one row with as many columns as needed
  const tableData = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Make the header row span all columns for correct visual structure
  // (WebImporter.DOMUtils.createTable doesn't set colspan, so we do it manually)
  if (block && block.rows.length > 0 && columns.length > 1) {
    const headerTh = block.rows[0].cells[0];
    headerTh.colSpan = columns.length;
    // Remove any additional th cells (should be only one)
    while (block.rows[0].cells.length > 1) {
      block.rows[0].deleteCell(1);
    }
  }

  element.replaceWith(block);
}
