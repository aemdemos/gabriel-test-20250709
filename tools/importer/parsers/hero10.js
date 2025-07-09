/* global WebImporter */
export default function parse(element, { document }) {
  // Table header (must match example exactly)
  const headerRow = ['Hero (hero10)'];

  // Get the grid of background images (as a single element)
  let backgroundImagesDiv = null;
  const gridDivs = element.querySelectorAll('.grid-layout');
  for (const grid of gridDivs) {
    if (grid.classList.contains('desktop-3-column')) {
      backgroundImagesDiv = grid;
      break;
    }
  }
  // If not found, leave background cell empty
  const backgroundCell = backgroundImagesDiv || '';

  // Get the content section: heading, subheading, buttons
  let contentCellChildren = [];
  const contentWrap = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentWrap) {
    // Heading (h1)
    const heading = contentWrap.querySelector('h1');
    if (heading) contentCellChildren.push(heading);
    // Subheading (p)
    const subheading = contentWrap.querySelector('p');
    if (subheading) contentCellChildren.push(subheading);
    // CTA buttons (all <a> tags in button group)
    const buttonGroup = contentWrap.querySelector('.button-group');
    if (buttonGroup) {
      const buttons = Array.from(buttonGroup.querySelectorAll('a'));
      contentCellChildren = contentCellChildren.concat(buttons);
    }
  }
  // If no content found, leave as empty array

  // Compose cells array as 1-col, 3-row table
  const cells = [
    headerRow,
    [backgroundCell],
    [contentCellChildren.length > 0 ? contentCellChildren : '']
  ];

  // Build and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
