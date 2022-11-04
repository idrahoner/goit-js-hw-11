import request from './js/request-service';
import messages from './js/messages';
import { formEl, galleryMarkup, loadMoreButton, submitButton } from './js/refs';

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
  request.renderRequestProcess(onSuccess, submitButton);
}

function onButtonClick() {
  request.increasePage();
  request.renderRequestProcess(onSuccess, loadMoreButton);
}

function onSuccess({ hits, totalHits } = {}) {
  galleryMarkup.renderMarkup(hits);

  const isEndOfList = galleryMarkup.getCurrentLength() === totalHits;

  messages.callRightMessage({
    errorCondition: !hits.length,
    successValue: totalHits,
    endOfListCondition: isEndOfList,
  });

  loadMoreButton.switchAvailable(isEndOfList);
}

function toInitialState() {
  galleryMarkup.clearMarkup();
  loadMoreButton.hide();
  request.reset();
  messages.reset();
}
