/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row exactly as in example
  const headerRow = ['Carousel (carousel24)'];

  // Find card bodies representing slides
  const cardBodies = element.querySelectorAll('.card-body');
  const slideRows = [];

  cardBodies.forEach(cardBody => {
    // Image (mandatory, always first cell)
    const img = cardBody.querySelector('img');
    // Text content (optional, second cell)
    // Heading (if any)
    const heading = cardBody.querySelector('.h4-heading, h1, h2, h3, h4, h5, h6');
    // Other description text (if any): any paragraph or div not the heading or image
    let description = [];
    Array.from(cardBody.childNodes).forEach(child => {
      if (child === img || child === heading) return;
      // Only include text nodes and non-heading/div tags
      if (child.nodeType === 3 && child.textContent.trim()) {
        description.push(document.createTextNode(child.textContent));
      } else if (
        child.nodeType === 1 &&
        child !== img &&
        child !== heading &&
        child.tagName !== 'IMG'
      ) {
        description.push(child);
      }
    });
    let textCell = null;
    if (heading) {
      // heading first, then any description nodes (if exist)
      textCell = [heading, ...description];
    } else if (description.length) {
      textCell = description;
    } else {
      textCell = '';
    }
    if (img) {
      slideRows.push([
        img,
        textCell
      ]);
    }
  });

  // Compose and replace block
  const table = [headerRow, ...slideRows];
  const block = WebImporter.DOMUtils.createTable(table, document);
  element.replaceWith(block);
}
