import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightBox = new SimpleLightbox('.gallery a');

export function renderMarkup(element, array) {
  element.insertAdjacentHTML('beforeend', createGallery(array));
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

export function clearMarkup(element) {
  element.innerHTML = '';
}

export function buttonGenerator(button) {
  return {
    element: button,
    content: button.textContent,

    show() {
      this.element.classList.remove('is-hidden');
    },

    hide() {
      this.element.classList.add('is-hidden');
    },

    lock() {
      this.element.textContent = 'Loading...';
      this.element.disabled = 'true';
    },

    unlock() {
      this.element.textContent = this.content;
      this.element.removeAttribute('disabled');
    },
  };
}
