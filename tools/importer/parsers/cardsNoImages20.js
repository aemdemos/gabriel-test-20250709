/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header row
  const cells = [['Cards']];

  // Each direct child div of the grid is a card
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach(cardDiv => {
    // The text is always inside the <p> tag
    const para = cardDiv.querySelector('p');
    if (para) {
      cells.push([para]); // Reference the actual paragraph element
    }
  });

  // Create the block table for Cards
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with our new block
  element.replaceWith(block);
}
