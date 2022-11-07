export default function (button) {
  return {
    element: button,

    show() {
      this.element.classList.remove('is-hidden');
    },

    hide() {
      this.element.classList.add('is-hidden');
    },

    lock() {
      this.element.disabled = 'true';
    },

    unlock() {
      this.element.removeAttribute('disabled');
    },

    shouldBeDisplayed(condition) {
      if (condition) {
        this.hide();
      } else {
        this.show();
      }
    },
  };
}
