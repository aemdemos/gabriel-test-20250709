/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as defined
  const headerRow = ['Cards (cards35)'];

  // Collect all card containers (each :scope > div)
  const cardDivs = element.querySelectorAll(':scope > div');

  // For each card, try to extract text in addition to the image if available
  const rows = Array.from(cardDivs).map((div) => {
    // Find the image inside
    const img = div.querySelector('img');
    // Try to find any sibling text content (common pattern: image + text block)
    let textContent = '';
    // If there are other elements (like p, h2, etc.), include them in textContent
    // Here, look for all non-img children
    const textEls = Array.from(div.children).filter(child => child !== img);
    if (textEls.length > 0) {
      // If there are text elements, include all
      textContent = textEls;
    } else {
      // As a fallback, check for text nodes
      // (unlikely for this structure, but ensures robustness)
      if (div.childNodes.length > 1) {
        // collect non-img nodes
        const extras = Array.from(div.childNodes).filter(
          node => node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0
        ).map(node => document.createTextNode(node.textContent));
        if (extras.length > 0) textContent = extras;
      }
    }
    return [img, textContent || ''];
  });

  // Compose table data
  const tableCells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}
