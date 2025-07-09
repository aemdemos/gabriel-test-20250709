/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main grid (assume only one container grid)
  const topGrid = element.querySelector(':scope > .w-layout-grid');
  if (!topGrid) return;

  // In the main grid, there is a container with content and an image
  let imageEl = null;
  let contentEl = null;
  // Find the image and content container
  Array.from(topGrid.children).forEach((child) => {
    if (child.tagName === 'IMG') {
      imageEl = child;
    } else if (child.classList.contains('w-layout-grid')) {
      // This grid contains the text/buttons container
      const section = child.querySelector('.section');
      if (section) contentEl = section;
    }
  });

  // Header row
  const headerRow = ['Hero (hero25)'];

  // Row 2: background image (if present)
  const imageRow = imageEl ? [imageEl] : [''];

  // Row 3: content (heading, paragraph, buttons)
  const contentParts = [];
  if (contentEl) {
    // Heading (if any)
    const heading = contentEl.querySelector('h2');
    if (heading) contentParts.push(heading);
    // Paragraph(s) (if any)
    const richText = contentEl.querySelector('.rich-text');
    if (richText) {
      Array.from(richText.children).forEach((el) => contentParts.push(el));
    }
    // Button group (if any)
    const btnGroup = contentEl.querySelector('.button-group');
    if (btnGroup) contentParts.push(btnGroup);
  }
  const contentRow = [contentParts];

  // Assemble rows
  const rows = [headerRow, imageRow, contentRow];

  // Create and replace the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
