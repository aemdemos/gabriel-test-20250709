/* global WebImporter */
export default function parse(element, { document }) {
  // The block header as in the example.
  const rows = [['Cards (cards22)']];

  // Get all tab panes: each may contain a grid of cards.
  const tabPanes = element.querySelectorAll('.w-tab-pane');

  tabPanes.forEach((pane) => {
    // The grid container for the cards
    const grid = pane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a ...> element
    const cards = Array.from(grid.children).filter(child => child.tagName === 'A');
    cards.forEach(card => {
      // --- IMAGE COLUMN ---
      // Look for image (in a .utility-aspect-3x2 container, but fallback to first img)
      let imageCell = '';
      const imgContainer = card.querySelector('.utility-aspect-3x2');
      let img = null;
      if (imgContainer) {
        img = imgContainer.querySelector('img');
      } else {
        img = card.querySelector('img');
      }
      if (img) imageCell = img;

      // --- TEXT COLUMN ---
      // Try to find heading and description
      let textCellContent = [];
      // Try direct h3
      let heading = card.querySelector('h3');
      if (!heading) {
        // Some cards use a nested structure (for text-only cards)
        const altText = card.querySelector('.utility-text-align-center');
        if (altText) heading = altText.querySelector('h3');
      }
      if (heading) textCellContent.push(heading);

      // Description: first .paragraph-sm after heading
      let desc = null;
      if (heading) {
        // Sometimes desc is nextElementSibling, sometimes deeper nested
        desc = heading.nextElementSibling;
        if (!(desc && desc.classList.contains('paragraph-sm'))) {
          // Try to look further
          const allDesc = card.querySelectorAll('.paragraph-sm');
          if (allDesc.length) desc = allDesc[0];
        }
      } else {
        // Try to grab any .paragraph-sm as fallback
        const allDesc = card.querySelectorAll('.paragraph-sm');
        if (allDesc.length) desc = allDesc[0];
      }
      if (desc) textCellContent.push(desc);

      // Fallback: if still no heading or desc, get all text (rare, but for robustness)
      if (textCellContent.length === 0) {
        textCellContent.push(document.createTextNode(card.textContent.trim()));
      }

      // Add the row: always [image, text]
      rows.push([imageCell || '', textCellContent]);
    });
  });

  // Create and replace with the table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
