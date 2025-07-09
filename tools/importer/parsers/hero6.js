/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero6)'];

  // Row 2: Background image (optional)
  // Look for the img with a visible src, treat as background image
  const bgImg = element.querySelector('img[src]');
  const row2 = [bgImg ? bgImg : ''];

  // Row 3: Content - title (h1), subheading (p.subheading), CTA buttons
  let contentCell = [];
  // Try to find the content card overlay
  const card = element.querySelector('.card');
  if (card) {
    // Title (h1)
    const h1 = card.querySelector('h1');
    if (h1) contentCell.push(h1);

    // Subheading (p.subheading)
    const subheading = card.querySelector('p.subheading');
    if (subheading) contentCell.push(subheading);

    // CTA buttons (all <a> inside .button-group)
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) {
      const buttons = Array.from(buttonGroup.querySelectorAll('a'));
      if (buttons.length) contentCell.push(...buttons);
    }
  }
  const row3 = [contentCell.length ? contentCell : ''];

  // Build block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,   // 1st row: header
    row2,        // 2nd row: background image element or ''
    row3         // 3rd row: content (heading, subheading, ctas)
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
