/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row as per the block name
  const rows = [['Cards (cards36)']];
  // Each direct child is a card wrapper
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach(cardDiv => {
    // Each card consists of an image inside
    const img = cardDiv.querySelector('img');
    // For semantic meaning, create an empty div for the text cell
    const textCell = document.createElement('div');
    // Only add row if image is present (defensive)
    if (img) {
      rows.push([img, textCell]);
    }
  });
  // Build and replace with table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
