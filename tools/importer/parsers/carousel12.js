/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as shown in the example
  const headerRow = ['Carousel (carousel12)'];

  // Get all immediate child slide containers
  const slides = element.querySelectorAll(':scope > div');
  const rows = [];

  slides.forEach((slide) => {
    // Find the image inside this slide
    const img = slide.querySelector('img');
    // If the image is missing, skip this slide
    if (!img) return;
    // Put the image element in the first cell, empty string in second (as in the example)
    rows.push([img, '']);
  });

  // Compose table data: Header row, then one row per slide
  const tableData = [headerRow, ...rows];
  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  // Replace the original element with the structured table
  element.replaceWith(block);
}
