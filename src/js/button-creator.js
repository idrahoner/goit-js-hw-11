export default function (button) {
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

    switchAvailable(condition) {
      if (condition) {
        this.hide();
      } else {
        this.show();
      }
    },
  };
}
