import { markupGenerator, buttonGenerator } from './markup';

export const formEl = document.querySelector('#search-form');
export const galleryMarkup = markupGenerator(
  document.querySelector('.gallery')
);
export const loadMoreButton = buttonGenerator(
  document.querySelector('.load-more')
);
export const submitButton = buttonGenerator(formEl.submit);
