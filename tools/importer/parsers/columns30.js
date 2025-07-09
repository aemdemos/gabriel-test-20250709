/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct column divs
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Header row: single cell, as per requirements
  const tableRows = [
    ['Columns (columns30)'], // header row: one cell
    columns                 // second row: one cell per column
  ];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
