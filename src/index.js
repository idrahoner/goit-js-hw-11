import request from './js/request-service';
import messages from './js/messages';
import { formEl, galleryEl, loadMoreButton, submitButton } from './js/refs';

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
  renderSubmit().finally(() => submitButton.unlock());
}

function onButtonClick() {
  request.increasePage();
  loadMoreButton.lock();
  renderLoadMore().finally(() => loadMoreButton.unlock());
}

function toInitialState() {
  galleryEl.resetMarkup();
  loadMoreButton.hide();
  request.reset();
  messages.reset();
}

async function renderSubmit() {
  try {
    await renderResponse();
    galleryEl.setCardHeight();
  } catch (error) {
    console.log(error);
  }
}

async function renderLoadMore() {
  try {
    await renderResponse();
    galleryEl.scrollDown();
  } catch (error) {
    console.log(error);
  }
}

async function renderResponse() {
  const { hits, totalHits } = await request.makeRequest();

  galleryEl.renderMarkup(hits);

  const isEndOfList = galleryEl.getCurrentLength() === totalHits;

  messages.callRightMessage({
    errorCondition: !hits.length,
    successValue: totalHits,
    endOfListCondition: isEndOfList,
  });

  loadMoreButton.shouldBeDisplayed(isEndOfList);
}
