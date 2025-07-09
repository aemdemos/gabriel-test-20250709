/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block table header
  const headerRow = ['Accordion (accordion21)'];
  const rows = [headerRow];

  // Get all immediate children that are .divider (each is an accordion item)
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));
  dividers.forEach(divider => {
    // Within each divider, get the grid-layout div
    const grid = divider.querySelector('.grid-layout');
    if (grid) {
      // Title (accordion label): find first .h4-heading
      const title = grid.querySelector('.h4-heading');
      // Content: find first .rich-text (accept any element for robustness)
      let content = grid.querySelector('.rich-text, [class*=rich-text], .paragraph-lg, p');
      // If not found, fallback to the second child div (for robustness)
      if (!content) {
        const children = grid.children;
        if (children.length > 1) {
          content = children[1];
        }
      }
      // Only add row if title and content are found
      if (title && content) {
        rows.push([title, content]);
      }
    }
  });

  // Create and replace with accordion block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
