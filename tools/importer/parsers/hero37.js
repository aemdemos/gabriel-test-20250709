/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the content block (no background image in this HTML)
  // 2. Collect heading, subheading, and CTA (button)
  // 3. Build a table: header, empty row, content row

  // Get grid container
  const grid = element.querySelector('.w-layout-grid, .grid-layout');

  // Prepare variables for possible content
  let title = null;
  let subheading = null;
  let cta = null;

  if (grid) {
    // Immediate children of grid, NOT deep descendants
    const gridChildren = Array.from(grid.children);
    // Title and subheading are likely together in a div
    const textDiv = gridChildren.find(div => div.querySelector('h1, h2, h3, h4, h5, h6'));
    if (textDiv) {
      title = textDiv.querySelector('h1, h2, h3, h4, h5, h6');
      // Prefer subheading class, fallback to first <p>
      subheading = textDiv.querySelector('.subheading') || textDiv.querySelector('p');
    }
    // CTA is a direct child that's an <a> with class 'button'
    cta = gridChildren.find(child => child.tagName === 'A' && child.classList.contains('button'));
  }

  // Compose the content cell
  const content = [];
  if (title) content.push(title);
  if (subheading && subheading !== title) content.push(subheading);
  if (cta) content.push(cta);

  // The block must have exactly 3 rows: header, background (empty), content
  const rows = [
    ['Hero (hero37)'],
    [''],
    [content]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
