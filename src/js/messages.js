import { Notify } from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

export default {
  status: false,

  callFailure() {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  },

  callSuccess(number) {
    Notify.success(`Hooray! We found ${number} images.`);
  },

  callEndOfList() {
    Notify.info("We're sorry, but you've reached the end of search results.");
  },

  callRightMessage({ errorCondition, endOfListCondition, successValue } = {}) {
    if (errorCondition) {
      this.callFailure();
    } else if (!this.status) {
      this.callSuccess(successValue);
      this.status = true;
    } else if (endOfListCondition) {
      this.callEndOfList();
    }
  },

  reset() {
    this.status = false;
  },
};
