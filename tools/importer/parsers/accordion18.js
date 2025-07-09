/* global WebImporter */
export default function parse(element, { document }) {
  // Gather all accordion items
  const accordionItems = element.querySelectorAll(':scope > div');

  // Prepare the header row: one cell, but ensure two columns (for table consistency)
  // This is done by passing two cells, one with header, one empty
  const headerRow = ['Accordion (accordion18)', ''];
  const rows = [headerRow];

  // For each accordion item, extract title and content
  accordionItems.forEach((item) => {
    // Title is inside the .w-dropdown-toggle > .paragraph-lg
    let title = '';
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      const titleElem = toggle.querySelector('.paragraph-lg');
      if (titleElem) title = titleElem;
    }
    // Content is inside nav.accordion-content .w-richtext
    let content = '';
    const nav = item.querySelector('nav.accordion-content');
    if (nav) {
      const rich = nav.querySelector('.w-richtext');
      if (rich) content = rich;
    }
    // Only add row if both cells are present
    if (title && content) {
      rows.push([title, content]);
    }
  });

  // Create and replace the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Set correct colspan for header cell to span both columns
  const firstRow = table.querySelector('tr:first-of-type');
  if (firstRow && firstRow.children.length === 2) {
    firstRow.children[0].setAttribute('colspan', '2');
    // Remove the empty cell
    firstRow.removeChild(firstRow.children[1]);
  }
  element.replaceWith(table);
}
