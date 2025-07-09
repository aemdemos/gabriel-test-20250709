/* global WebImporter */
export default function parse(element, { document }) {
  // The header row, exactly as in the example
  const headerRow = ['Carousel (carousel17)'];

  // Find the grid with the carousel items
  const grid = element.querySelector('.w-layout-grid');
  const tableRows = [headerRow];

  if (grid) {
    // Get all immediate child divs (each is a potential slide)
    const slides = grid.querySelectorAll(':scope > div');
    slides.forEach((slide) => {
      // Each slide's image is inside a .utility-aspect-2x3 div
      let img = slide.querySelector('.utility-aspect-2x3 img');
      // Try to find any text block associated with this image/slide
      // In this specific HTML, there is only the image, so if no text, use empty string
      // If text is ever present in the markup, this code will fetch it
      let textContent = '';
      // Look for a heading or paragraph or link sibling (if present) inside this slide
      // For more generality, search all children except .utility-aspect-2x3
      const contentBlocks = Array.from(slide.children).filter(child => !child.classList.contains('utility-aspect-2x3'));
      if (contentBlocks.length > 0) {
        const textElements = [];
        contentBlocks.forEach(block => {
          // Append block or its children to textElements
          if (block.children.length > 0) {
            textElements.push(...block.children);
          } else {
            textElements.push(block);
          }
        });
        if (textElements.length > 0) {
          textContent = textElements;
        }
      }
      // Add the row: [image, textContent]
      if (img) {
        tableRows.push([img, textContent]);
      }
    });
  }

  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
