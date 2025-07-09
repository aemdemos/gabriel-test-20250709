/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing column content
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const children = Array.from(grid.children);

  // Defensive: Must have at least 3 children: info div, ul contacts, image
  if (children.length < 3) return;

  // Prepare left column (info div + contact list)
  const leftCol = document.createElement('div');
  // Use references from the DOM -- move the elements into new container (not clone)
  leftCol.appendChild(children[0]);
  leftCol.appendChild(children[1]);
  // Right column: image
  const rightCol = children[2];

  // Table header
  const cells = [
    ['Columns (columns19)'],
    [leftCol, rightCol],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
