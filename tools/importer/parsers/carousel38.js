/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required
  const headerRow = ['Carousel (carousel38)'];

  // Find the main grid containing both content and images
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Find all immediate children (columns)
  const columns = Array.from(mainGrid.children);
  let textCol = null;
  let imagesCol = null;
  for (const col of columns) {
    if (col.querySelector('h1,h2,h3,h4,h5,h6') || col.querySelector('.button-group')) {
      textCol = col;
    } else if (col.querySelector('img')) {
      imagesCol = col;
    }
  }

  // Extract images for slides
  let imageNodes = [];
  if (imagesCol) {
    // Find the grid containing the images
    const slidesGrid = imagesCol.querySelector('.grid-layout');
    if (slidesGrid) {
      imageNodes = Array.from(slidesGrid.querySelectorAll('img'));
    } else {
      imageNodes = Array.from(imagesCol.querySelectorAll('img'));
    }
  }

  // Extract text content for the first slide
  let slideText = null;
  if (textCol) {
    const blocks = [];
    const heading = textCol.querySelector('h1,h2,h3,h4,h5,h6');
    if (heading) blocks.push(heading);
    const subheading = textCol.querySelector('p');
    if (subheading) blocks.push(subheading);
    const buttons = textCol.querySelector('.button-group');
    if (buttons) blocks.push(buttons);
    if (blocks.length > 0) slideText = blocks;
  }

  // Construct slide rows: first image gets text content, others get empty cell
  const rows = imageNodes.map((img, idx) => [img, idx === 0 && slideText ? slideText : '']);

  // Compose table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
