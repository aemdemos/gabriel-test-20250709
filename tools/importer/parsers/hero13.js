/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row matches the block name
  const headerRow = ['Hero (hero13)'];

  // Find the background image (the large one)
  let bgImg = null;
  const relDivs = element.querySelectorAll('.utility-position-relative');
  for (const relDiv of relDivs) {
    const img = relDiv.querySelector('img.cover-image');
    if (img && img.src && img.getAttribute('src').endsWith('.avif')) {
      // Heuristic: the first .utility-position-relative with a .cover-image is the background
      bgImg = img;
      break;
    }
  }

  // Now find the content (headline, subpoints, CTA)
  let contentFragments = [];
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    // Decorative image (left column)
    const fgImg = cardBody.querySelector('img.cover-image');
    if (fgImg) contentFragments.push(fgImg);
    // Headline (h2)
    const h2 = cardBody.querySelector('h2');
    if (h2) contentFragments.push(h2);
    // Subpoints - all p's in .flex-horizontal inside .flex-vertical
    const verticalStack = cardBody.querySelector('.flex-vertical');
    if (verticalStack) {
      const subpoints = verticalStack.querySelectorAll('.flex-horizontal p');
      subpoints.forEach(p => contentFragments.push(p));
    }
    // CTA button
    const btnGroup = cardBody.querySelector('.button-group');
    if (btnGroup) {
      const btn = btnGroup.querySelector('a, button');
      if (btn) contentFragments.push(btn);
    }
  }

  // Compose the table
  const cells = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentFragments]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
