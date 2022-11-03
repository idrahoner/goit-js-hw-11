import { createMarkupObj, createButtonObj } from './markup';

export const formEl = document.querySelector('#search-form');
export const galleryMarkup = createMarkupObj(
  document.querySelector('.gallery')
);
export const loadMoreButton = createButtonObj(
  document.querySelector('.load-more')
);
export const submitButton = createButtonObj(formEl.submit);
