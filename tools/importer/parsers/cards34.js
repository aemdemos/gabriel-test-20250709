/* global WebImporter */
export default function parse(element, { document }) {
  // Header as in the sample: block name, exactly as required
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];
  // Select all direct card anchors
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach(card => {
    // Each card structure: <a><div><img/><div>...content...</div></div></a>
    const grid = card.querySelector(':scope > div');
    if (!grid) return; // skip if structure is incomplete
    const image = grid.querySelector('img');
    // Find the content div (should be the last direct child of grid, not containing the img)
    let contentDiv = null;
    const children = Array.from(grid.children);
    for (let child of children) {
      if (child !== image && child.tagName === 'DIV') {
        contentDiv = child;
      }
    }
    // Defensive: if image or contentDiv is missing, skip this card
    if (!image || !contentDiv) return;
    rows.push([
      image,
      contentDiv
    ]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
