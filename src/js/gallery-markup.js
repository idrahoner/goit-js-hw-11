import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightBox = new SimpleLightbox('.gallery a');

// test git

export default function (DOMelement) {
  return {
    element: DOMelement,
    counter: 0,

    getCurrentLength() {
      return this.counter;
    },

    resetMarkup() {
      this.element.innerHTML = '';
      this.counter = 0;
      this.cardHeight = 0;
    },

    scrollDown() {
      const { height: cardHeight } =
        this.element.firstElementChild.getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    },

    renderMarkup(array) {
      if (!array.length) {
        return;
      }
      this.element.insertAdjacentHTML('beforeend', this.createGallery(array));
      lightBox.refresh();
    },

    createGallery(array) {
      const cards = array.map(this.createCard);
      this.counter += cards.length;
      return cards.join('');
    },

    createCard(element) {
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
      <a href=${largeImageURL} class="photo-card__thumb">
      <img src="${webformatURL}" alt="${tags}" class="photo-card__image" loading="lazy" width="300" height="200" />
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
    },
  };
}
