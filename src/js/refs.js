import createGalleryObj from './gallery-markup';
import createButtonObj from './button-creator';

export const formEl = document.querySelector('#search-form');
export const submitButton = createButtonObj(formEl.submit);
export const loadMoreButton = createButtonObj(
  document.querySelector('.load-more')
);
export const galleryEl = createGalleryObj(document.querySelector('.gallery'));
