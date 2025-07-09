/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the main grid (contains heading, quote, and meta grid)
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // Get direct children
  const children = Array.from(mainGrid.children);
  // Find heading and quote
  const heading = children.find(el => el.matches('p.h2-heading'));
  const quote = children.find(el => el.matches('p.paragraph-lg'));
  // Find meta grid
  const metaGrid = children.find(el => el.classList.contains('w-layout-grid'));
  let divider, avatarBlock, logoBlock;
  if (metaGrid) {
    const metaChildren = Array.from(metaGrid.children);
    divider = metaChildren[0];
    avatarBlock = metaChildren[1];
    logoBlock = metaChildren[2];
  }

  // Compose left cell: heading, divider, avatarBlock (grouped in source order)
  const leftCell = document.createElement('div');
  if (heading) leftCell.appendChild(heading);
  if (divider) leftCell.appendChild(divider);
  if (avatarBlock) leftCell.appendChild(avatarBlock);

  // Compose right cell: quote, logoBlock
  const rightCell = document.createElement('div');
  if (quote) rightCell.appendChild(quote);
  if (logoBlock) rightCell.appendChild(logoBlock);

  // Build table: header row, then one content row with two columns
  const cells = [
    ['Columns (columns27)'],
    [leftCell, rightCell]
  ];

  // Replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
