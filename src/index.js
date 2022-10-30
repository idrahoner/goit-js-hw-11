// create form markup ---V
// create request to server ---V
// get data from server ---V
//   - set paggination
// render card markup ---V
// set light-box ---V
// set button 'load more' ---V
// set schema of works
// add styles for page
// set additional tasks

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import axios from 'axios';

const request = {
  url: 'https://pixabay.com/api/',
  key: '30965051-be301043694ab243532f6a4d6',
  query: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 5,

  setQuery(newQuery) {
    this.query += newQuery;
  },

  increasePage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },

  getURL() {
    return (
      `${this.url}?key=${this.key}&q=${this.query}` +
      `&image_type=${this.image_type}&orientation=${this.orientation}&safesearch=${this.safesearch}` +
      `&page=${this.page}&per_page=${this.per_page}`
    );
  },
};

const messages = {
  notFound:
    'Sorry, there are no images matching your search query. Please try again.',
  endOfList: "We're sorry, but you've reached the end of search results.",
  access: 'Hooray! We found totalHits images.',
};

const lightBox = new SimpleLightbox('.gallery a');
console.log(lightBox.elements);

const formEl = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');

formEl.addEventListener('submit', onFormSubmit);
loadMoreButton.addEventListener('click', onButtonClick);

function onFormSubmit(event) {
  event.preventDefault();

  request.setQuery(formEl.searchQuery.value.trim());

  makeRequest(request.getURL());
}

function makeRequest(URL) {
  axios
    .get(URL)
    .then(({ data }) => {
      renderMarkup(data.hits);
    })
    .catch(console.log);
}

function renderMarkup(array) {
  if (array.length <= 0) {
    return Notiflix.Notify.failure(messages.notFound);
  }
  galleryEl.insertAdjacentHTML('beforeend', createGallery(array));

  lightBox.refresh();
}

function createGallery(array) {
  return array.map(createCard).join('');
}

function createCard(element) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = element;
  return `
        <div class="photo-card">
            <a href=${largeImageURL}>
                <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300" height="200" />
            </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b>
                    ${likes}
                </p>
                <p class="info-item">
                    <b>Views</b>
                    ${views}
                </p>
                <p class="info-item">
                    <b>Comments</b>
                    ${comments}
                </p>
                <p class="info-item">
                    <b>Downloads</b>
                    ${downloads}
                </p>
            </div>
        </div>
    `;
}

function onButtonClick() {
  request.increasePage();
  makeRequest(request.getURL());
}

// conditions:
// - initial;
// - bad request;
// - good request;
// - "load more" request;
// - end of list;
// - loading;

// initial condition:
// - "load more" button - display: none;
// - form is clean;

// bad request:
// - form is clean;
// - push alert with message;

// good request:
// - render new markup;
// - clear input;
// - "load more" button - display: block;
// - alert with message;

// "load more" request:
// - request next page;
// - render additional markup;

// end of list:
// - create message "end of list";

// loading:
// - "load more" button with text Loading...;
