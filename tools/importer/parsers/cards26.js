/* global WebImporter */
export default function parse(element, { document }) {
  // Block header exactly as in the example
  const headerRow = ['Cards (cards26)'];

  // Utility: For a card, extract the first <img> and the text content (heading/paragraphs)
  function extractCard(card) {
    // Find the first image in the card
    const img = card.querySelector('img');
    // Try to find any container with text
    let textCell = null;
    // Priority: container with .utility-padding-all-2rem (holds heading + p)
    const inner = card.querySelector('.utility-padding-all-2rem');
    if (inner) {
      textCell = inner;
    } else {
      // Fallback: any <h3>, <h2>, <h1>, <p> direct children of the card
      const frag = document.createDocumentFragment();
      const heads = card.querySelectorAll('h1, h2, h3, h4, h5, h6, p');
      heads.forEach(node => frag.appendChild(node));
      textCell = frag.childNodes.length ? frag : '';
    }
    return [img, textCell];
  }

  // Each card is a direct child with an <img>, or children with an <img>
  const cardDivs = Array.from(element.querySelectorAll(':scope > div')).filter(div => div.querySelector('img'));

  // For each card, extract the img and text content (if any)
  const rows = cardDivs.map(card => extractCard(card));

  // Compose the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace element
  element.replaceWith(table);
}
