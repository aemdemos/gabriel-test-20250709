/* global WebImporter */
export default function parse(element, { document }) {
  // Find the currently active tab pane
  const activeTab = element.querySelector('.w-tab-pane.w--tab-active');
  if (!activeTab) return;

  // Find the grid layout inside the active tab
  const grid = activeTab.querySelector('.w-layout-grid');
  if (!grid) return;

  // Row 2: collect all <img> in grid as background image(s)
  const imgs = Array.from(grid.querySelectorAll('img'));

  // Row 3: collect all content except <img> (headings, paragraphs, etc)
  // We want to capture the actual elements from the DOM, preserving their structure
  const contentElements = [];
  Array.from(grid.children).forEach(child => {
    if (child.tagName !== 'IMG') {
      contentElements.push(child);
    }
  });

  // Compose the rows for the block table
  const rows = [];
  // Header row: block name as string
  rows.push(['Hero (hero23)']);
  // Background image row
  rows.push([imgs.length === 1 ? imgs[0] : imgs.length > 1 ? imgs : '']);
  // Content row: all non-image content (preserving order)
  rows.push([contentElements.length === 1 ? contentElements[0] : contentElements.length > 1 ? contentElements : '']);

  // Create block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
