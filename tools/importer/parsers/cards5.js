/* global WebImporter */
export default function parse(element, { document }) {
  // Header as required
  const headerRow = ['Cards (cards5)'];

  // Find all cards in the element
  const cards = Array.from(element.querySelectorAll(':scope > a.card-link'));

  const rows = cards.map((card) => {
    // Image: Get the <img> inside the card
    const imgContainer = card.querySelector('.utility-aspect-3x2');
    let image = null;
    if (imgContainer) {
      image = imgContainer.querySelector('img');
    }

    // Content: gather tag, heading, and description in order
    const contentWrapper = card.querySelector('.utility-padding-all-1rem');
    const contentParts = [];
    if (contentWrapper) {
      const tagGroup = contentWrapper.querySelector('.tag-group');
      if (tagGroup) {
        // Use the entire tag group as is for structure
        contentParts.push(tagGroup);
      }
      const heading = contentWrapper.querySelector('h3');
      if (heading) {
        contentParts.push(heading);
      }
      const desc = contentWrapper.querySelector('p');
      if (desc) {
        contentParts.push(desc);
      }
    }

    // Each row is in [image, content] format
    return [image, contentParts];
  });

  // Compose the table: header first row, then each card as a row
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows,
  ], document);

  element.replaceWith(table);
}
