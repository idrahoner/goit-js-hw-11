import request from './js/request-service';
import messages from './js/messages';
import { formEl, galleryMarkup, loadMoreButton, submitButton } from './js/refs';

// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// console.log(cardHeight);

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });

formEl.addEventListener('submit', onFormSubmit);
loadMoreButton.element.addEventListener('click', onButtonClick);

function onFormSubmit(event) {
  event.preventDefault();
  toInitialState();

  const searchQuery = event.currentTarget.searchQuery.value.trim();
  if (!searchQuery) {
    return;
  }

  request.setQuery(searchQuery);
  submitButton.lock();
  renderResponse().finally(() => submitButton.unlock());
}

function onButtonClick() {
  request.increasePage();
  loadMoreButton.lock();
  renderResponse().finally(() => loadMoreButton.unlock());
}

function toInitialState() {
  galleryMarkup.clearMarkup();
  loadMoreButton.hide();
  request.reset();
  messages.reset();
}

async function renderResponse() {
  const { hits, totalHits } = await request.makeRequest();

  galleryMarkup.renderMarkup(hits);

  const isEndOfList = galleryMarkup.getCurrentLength() === totalHits;

  messages.callRightMessage({
    errorCondition: !hits.length,
    successValue: totalHits,
    endOfListCondition: isEndOfList,
  });

  loadMoreButton.switchAvailable(isEndOfList);
}
