import axios from 'axios';

export default {
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

  resetQuery() {
    this.query = '';
  },

  allReset() {
    this.resetPage();
    this.resetQuery();
  },

  getURL() {
    return (
      `${this.url}?key=${this.key}&q=${this.query}` +
      `&image_type=${this.image_type}&orientation=${this.orientation}&safesearch=${this.safesearch}` +
      `&page=${this.page}&per_page=${this.per_page}`
    );
  },

  async makeRequest() {
    const { data } = await axios(this.getURL());
    return data;
  },

  async responseHandler(callback) {
    const response = await this.makeRequest();
    callback(response);
  },

  renderRequestProcess(callback, buttonPressed) {
    buttonPressed.lock();
    this.responseHandler(callback).finally(() => {
      buttonPressed.unlock();
    });
  },
};
