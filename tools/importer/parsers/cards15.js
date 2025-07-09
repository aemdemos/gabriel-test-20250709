/* global WebImporter */
export default function parse(element, { document }) {
  // Table header (block name)
  const headerRow = ['Cards (cards15)'];
  const rows = [];

  // Each card is a direct <a> child
  const cards = element.querySelectorAll(':scope > a');
  cards.forEach(card => {
    // Image: first <div> with img inside
    const imgDiv = card.querySelector('div.utility-aspect-2x3');
    let img = null;
    if (imgDiv) {
      img = imgDiv.querySelector('img');
    }

    // Tag and date container
    const metaRow = card.querySelector('.flex-horizontal');
    let tagText = '', dateText = '';
    if (metaRow) {
      const tag = metaRow.querySelector('.tag');
      if (tag) tagText = tag.textContent.trim();
      const date = metaRow.querySelector('.paragraph-sm');
      if (date) dateText = date.textContent.trim();
    }

    // Title
    const titleEl = card.querySelector('h3, .h4-heading');
    let title = '';
    if (titleEl) title = titleEl.textContent.trim();

    // Compose text cell content
    const textCell = document.createElement('div');
    if (tagText || dateText) {
      const metaDiv = document.createElement('div');
      if (tagText) {
        const tagSpan = document.createElement('span');
        tagSpan.textContent = tagText;
        tagSpan.style.fontWeight = 'bold';
        tagSpan.style.marginRight = '0.5em';
        metaDiv.appendChild(tagSpan);
      }
      if (dateText) {
        const dateSpan = document.createElement('span');
        dateSpan.textContent = dateText;
        metaDiv.appendChild(dateSpan);
      }
      metaDiv.style.marginBottom = '0.25em';
      textCell.appendChild(metaDiv);
    }
    if (title) {
      const titleHeading = document.createElement('div');
      titleHeading.style.fontWeight = 'bold';
      titleHeading.style.marginBottom = '0.25em';
      titleHeading.textContent = title;
      textCell.appendChild(titleHeading);
    }
    rows.push([
      img,
      textCell
    ]);
  });

  // Compose the table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
