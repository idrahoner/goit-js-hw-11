import { Notify } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

import { markupGenerator, buttonGenerator } from './js/markup';

import request from './js/request-service';

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');

const galleryMarkup = markupGenerator(galleryEl);

const loadMoreButton = buttonGenerator(document.querySelector('.load-more'));
const submitButton = buttonGenerator(formEl.submit);

formEl.addEventListener('submit', onFormSubmit);
loadMoreButton.element.addEventListener('click', onButtonClick);

function onFormSubmit(event) {
  event.preventDefault();
  toInitialState();

  const searchRequest = event.currentTarget.searchQuery.value.trim();

  if (!searchRequest) {
    return;
  }

  submitButton.lock();

  request.setQuery(searchRequest);
  request.makeRequest().then(onFormSuccess).finally(unlockButtons);
}

function onFormSuccess({ hits, totalHits } = {}) {
  if (hits.length <= 0) {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  Notify.success(`Hooray! We found ${totalHits} images.`);
  formEl.searchQuery.value = '';

  galleryMarkup.renderMarkup(hits);
  loadMoreButton.show();
}

function onButtonClick() {
  request.increasePage();

  loadMoreButton.lock();
  request.makeRequest().then(onLoadMoreButtonSuccess).finally(unlockButtons);
}

function onLoadMoreButtonSuccess({ hits, totalHits } = {}) {
  galleryMarkup.renderMarkup(hits);

  const photoCards = document.querySelectorAll('.photo-card');

  if (photoCards.length === totalHits) {
    loadMoreButton.hide();
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
}

function unlockButtons() {
  loadMoreButton.unlock();
  submitButton.unlock();
}

function toInitialState() {
  galleryMarkup.clearMarkup();
  loadMoreButton.hide();
  request.allReset();
}
