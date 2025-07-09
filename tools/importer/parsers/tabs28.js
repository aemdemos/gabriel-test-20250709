/* global WebImporter */
export default function parse(element, { document }) {
  // Get all tab labels (each tab is an <a>)
  const tabLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Build the table: header is a single cell ['Tabs'], content rows are two cells [label, content]
  const rows = [ ['Tabs'] ];

  tabLinks.forEach((tabLink) => {
    // Tab label: get the inner text from <div>, else from the <a>
    let label = '';
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = tabLink.textContent.trim();
    }
    // Content is missing from provided HTML, so leave empty string
    rows.push([label, '']);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
