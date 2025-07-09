/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main (top) grid for the text columns
  const mainGrid = element.querySelector('.grid-layout.tablet-1-column');
  // Find the lower image grid
  const imageGrid = element.querySelector('.grid-layout.mobile-portrait-1-column');

  // Prepare the two main columns (textual content)
  let textCols = [null, null];
  if (mainGrid) {
    const mainChildren = Array.from(mainGrid.children);
    // Left column: headline/eyebrow
    if (mainChildren[0]) {
      textCols[0] = mainChildren[0];
    }
    // Right column: paragraph + author + button
    if (mainChildren[1]) {
      textCols[1] = mainChildren[1];
    }
  }
  // Prepare the two image columns
  let imgCols = [null, null];
  if (imageGrid) {
    const imgs = Array.from(imageGrid.querySelectorAll('.utility-aspect-1x1'));
    imgCols = imgs.map(div => {
      const img = div.querySelector('img');
      return img ? img : div;
    });
    // If fewer than 2 images, pad with nulls
    while (imgCols.length < 2) imgCols.push(null);
  }

  // Build the table as per the block spec
  const rows = [
    ['Columns (columns16)'],
    textCols,
    imgCols
  ];
  // Remove rows that are all null (shouldn't happen, but for robustness)
  const validRows = rows.filter((row, i) => i === 0 || row.some(cell => cell));
  const table = WebImporter.DOMUtils.createTable(validRows, document);
  element.replaceWith(table);
}
