/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Hero (hero14)'];

  // Find the grid divs (immediate children of the .grid-layout)
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');

  // 1. Extract the background image (row 2)
  let bgImgEl = null;
  if (gridDivs.length > 0) {
    // The first grid cell contains a div with the image inside
    const firstCell = gridDivs[0];
    bgImgEl = firstCell.querySelector('img');
  }

  // 2. Extract the content (row 3)
  let contentEl = null;
  if (gridDivs.length > 1) {
    // The second grid cell contains the content (container > div > h1, etc)
    const secondCell = gridDivs[1];
    // We want the content block with h1 and button group
    const contentBlock = secondCell.querySelector('.utility-margin-bottom-6rem');
    // There may be a .container wrapper we need to grab
    if (contentBlock) {
      contentEl = contentBlock;
    } else {
      // Fallback: use all children of the cell
      const children = Array.from(secondCell.children);
      if (children.length) {
        const wrapper = document.createElement('div');
        children.forEach(child => wrapper.appendChild(child));
        contentEl = wrapper;
      } else {
        contentEl = secondCell;
      }
    }
  }

  // Compose the table rows, keeping the structure as per the block definition
  const cells = [
    headerRow,
    [bgImgEl],
    [contentEl],
  ];

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
