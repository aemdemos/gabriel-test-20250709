/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Cards (cards39)'];

  // Find the top-level grid containing all cards
  const container = element.querySelector('.container');
  if (!container) return;
  // The main grid is the only direct child with .w-layout-grid
  const grids = Array.from(container.children).filter(child => child.classList && child.classList.contains('w-layout-grid'));
  if (grids.length === 0) return;
  const mainGrid = grids[0];

  // The card structure: either direct <a> children or there's a 2-col grid with nested cards
  // Approach: flatten all <a.utility-link-content-block> descendants except those inside nested .w-layout-grid
  // But in this HTML, it's a big card (first <a>) plus a nested grid of more cards

  // 1. First card (big one)
  const cards = [];
  const mainChildren = Array.from(mainGrid.children);
  // Find first <a> (not inside any nested grid)
  let firstCard = null;
  for (const child of mainChildren) {
    if (child.matches('a.utility-link-content-block')) {
      firstCard = child;
      break;
    }
  }
  if (firstCard) {
    // Extract image (find the first <img> descendant)
    const img = firstCard.querySelector('img');
    // Text content: all except the image (find heading, p, button)
    // Find the container for text (usually .utility-padding-all-2rem)
    const textContainer = firstCard.querySelector('.utility-padding-all-2rem') || firstCard;
    // Collect heading (h2/h3/h4/h5/h6), all <p>, and the .button (if exists)
    const heading = textContainer.querySelector('h2,h3,h4,h5,h6');
    const p = textContainer.querySelector('p');
    const button = textContainer.querySelector('.button');
    const textCell = [];
    if (heading) textCell.push(heading);
    if (p) textCell.push(p);
    if (button) textCell.push(button);
    cards.push([img, textCell]);
  }

  // 2. Nested grid of cards
  const nestedGrid = mainGrid.querySelector('.w-layout-grid');
  if (nestedGrid) {
    const nestedCards = Array.from(nestedGrid.querySelectorAll(':scope > a.utility-link-content-block'));
    nestedCards.forEach(nestedCard => {
      // For each card, extract image and text content
      const img = nestedCard.querySelector('img');
      const heading = nestedCard.querySelector('h2,h3,h4,h5,h6');
      const p = nestedCard.querySelector('p');
      const button = nestedCard.querySelector('.button');
      const textCell = [];
      if (heading) textCell.push(heading);
      if (p) textCell.push(p);
      if (button) textCell.push(button);
      cards.push([img, textCell]);
    });
  }

  // Build final table
  // Only include rows for cards that have an image and at least some text content
  const rows = cards.filter(card => card[0] || (Array.isArray(card[1]) && card[1].length > 0));
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
