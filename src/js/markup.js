import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightBox = new SimpleLightbox('.gallery a');

export function createMarkupObj(DOMelement) {
  return {
    element: DOMelement,
    nestedElements: DOMelement.children,

    getCurrentLength() {
      return this.nestedElements.length;
    },

    clearMarkup() {
      this.element.innerHTML = '';
    },

    renderMarkup(array) {
      if (!array.length) {
        return;
      }
      this.element.insertAdjacentHTML('beforeend', this.createGallery(array));
      lightBox.refresh();
    },

    createGallery(array) {
      return array.map(this.createCard).join('');
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
    },
  };
}
