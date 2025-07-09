/* global WebImporter */
export default function parse(element, { document }) {
  // Gather all direct child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // The header row should be a single cell/column with the block name
  const cells = [
    ['Columns (columns40)'],
    columns
  ];
  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace original element with table
  element.replaceWith(table);
}
