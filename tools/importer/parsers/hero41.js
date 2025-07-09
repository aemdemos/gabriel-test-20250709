/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name as in the example
  const headerRow = ['Hero (hero41)'];

  // Find the background image: the only prominent <img> in the block
  const backgroundImg = element.querySelector('img.cover-image');

  // Compose the text/content row with title, subheading, and CTA
  // Get the main headline (h1)
  const h1 = element.querySelector('h1');
  // Get the paragraph (subheading/lead)
  const paragraph = element.querySelector('p');
  // Get the CTA link/button (if present)
  const cta = element.querySelector('.button-group a, .button-group button');

  // Make content container and append only if present
  const contentBits = [];
  if (h1) contentBits.push(h1);
  if (paragraph) contentBits.push(paragraph);
  if (cta) contentBits.push(cta);

  // If all are missing, put an empty cell to avoid errors
  const contentRow = [contentBits.length ? contentBits : ''];

  // Table construction per the example: header, image, then text/cta
  const rows = [
    headerRow,
    [backgroundImg ? backgroundImg : ''],
    contentRow
  ];

  // Build the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
