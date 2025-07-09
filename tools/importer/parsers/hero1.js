/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Get all <img> elements inside the grid
  const images = Array.from(element.querySelectorAll('img'));

  // 2. Create a fragment for all images (so each image is included in background row)
  const backgroundFragment = document.createDocumentFragment();
  images.forEach(img => backgroundFragment.appendChild(img));

  // 3. Build the cells array for the Hero (hero1) block
  //    - First row: block name
  //    - Second row: image(s)
  //    - Third row: content (none in provided HTML)
  const cells = [
    ['Hero (hero1)'],
    [backgroundFragment],
    ['']
  ];

  // 4. Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
