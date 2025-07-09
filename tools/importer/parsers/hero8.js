/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout within the header (contains image and content)
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;
  const gridChildren = Array.from(mainGrid.children);
  // Find the image (IMG element)
  const imgEl = gridChildren.find(child => child.tagName === 'IMG');
  // Find the text/content DIV (the other child of the grid)
  const contentDiv = gridChildren.find(child => child !== imgEl);
  // Prepare the image cell: include image if found, else empty string
  const imageCell = imgEl || '';
  // Prepare the text cell: include ALL child nodes of contentDiv (elements and text), preserving semantics
  let textCell = '';
  if (contentDiv) {
    // Get all child nodes, filtering out empty text nodes
    const nodes = Array.from(contentDiv.childNodes).filter(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.trim().length > 0;
      }
      // Keep all element nodes
      return node.nodeType === Node.ELEMENT_NODE;
    });
    // If one node, just use it, else use array
    if (nodes.length === 1) {
      textCell = nodes[0];
    } else if (nodes.length > 1) {
      textCell = nodes;
    }
  }
  // Table: 1 column, 3 rows; header EXACTLY matches example
  const cells = [
    ['Hero (hero8)'],
    [imageCell],
    [textCell]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
