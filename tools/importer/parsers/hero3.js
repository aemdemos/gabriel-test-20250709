/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: Block name exactly as required
  const headerRow = ['Hero (hero3)'];

  // 2nd row: Background image (none in the provided HTML)
  const backgroundImageRow = [''];

  // 3rd row: Title, subheading, CTA(s)
  // Find the grid element (contains the text and button group)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  let contentElements = [];

  if (grid) {
    // The grid has two main children: one for headings, one for buttons
    const children = Array.from(grid.children);
    // First child: text (h2, p)
    if (children[0]) {
      const h2 = children[0].querySelector('h2');
      const subheading = children[0].querySelector('p');
      if (h2) contentElements.push(h2);
      if (subheading) contentElements.push(document.createElement('br'), subheading);
    }
    // Second child: buttons (a tags)
    if (children[1]) {
      // Collect all <a> elements
      const ctas = Array.from(children[1].querySelectorAll('a'));
      if (ctas.length) {
        contentElements.push(document.createElement('br'));
        // Separate CTAs with <br>
        for (let i = 0; i < ctas.length; i++) {
          contentElements.push(ctas[i]);
          if (i < ctas.length - 1) contentElements.push(document.createElement('br'));
        }
      }
    }
  }
  // Defensive: if there is no grid, leave content row empty
  const contentRow = [contentElements.length ? contentElements : ''];

  // Create the table as specified
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    backgroundImageRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
