/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout which contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get column elements: The grid has three main children
  // 1: Big feature left (a)
  // 2: 2 stacked a's (div with 2 a's)
  // 3: right vertical stack of a's (div with many a's, .divider between)

  const [mainLeft, stacked, sideStack] = grid.children;
  if (!mainLeft || !stacked || !sideStack) return;

  // For columns 2: stacked has two <a>
  const stackedLinks = Array.from(stacked.querySelectorAll(':scope > a'));
  // For column 4: only <a> children of sideStack, ignore .divider
  const rightLinks = Array.from(sideStack.querySelectorAll(':scope > a'));

  // Build table header and rows (as per the example, header is single cell, then a row with 4 columns)
  const headerRow = ['Columns (columns4)'];
  const row = [
    mainLeft,
    stackedLinks[0] || document.createTextNode(''),
    stackedLinks[1] || document.createTextNode(''),
    rightLinks.length ? rightLinks : document.createTextNode('')
  ];

  // Create the table using the helper
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row
  ], document);

  // Replace the original section element with the table
  element.replaceWith(table);
}
