/* eslint-disable no-invalid-this */

import lunr from 'lunr';

class Search {
  constructor(subscriber) {
    this.subscriber = subscriber;
    this.input = document.querySelector('.topic-search');
    this.idx;
    this.timeout;
    this.searchResult = document.querySelector('.search-result');

    this.inputOnChange = this.inputOnChange.bind(this);
    this.loadIndex = this.loadIndex.bind(this);
    this.loadIndex();
    this.addEventListeners();
  }

  addEventListeners() {
    this.input.addEventListener('input', this.inputOnChange);
  }

  inputOnChange() {
    clearTimeout(this.timeout);
    if (this.input.value.length <= 1) {
      document
        .querySelector('.select-label')
        .classList.remove('select-label--hidden');
      this.searchResult.innerText = '';
    }
    this.timeout = setTimeout(() => {
      this.subscriber.publish('remove-filter');
      if (this.input.value.length > 2) {
        document
          .querySelector('.select-label')
          .classList.add('select-label--hidden');
        const refs = this.idx.search(this.input.value);
        const filteredParagraphs = refs.map(p => parseInt(p.ref));
        const searchResults = filteredParagraphs.length;
        const paragraphWord =
          searchResults == 1
            ? 'paragraph matches/contains '
            : 'paragraphs match/contain ';
        this.searchResult.innerText = `${searchResults} ${paragraphWord}"${
          this.input.value
        }"`;
        this.subscriber.publish('paragraph-filter', filteredParagraphs);
      }
    }, 500);
  }

  loadIndex() {
    fetch('./lunr-index.json')
      .then(response => {
        return response.json();
      })
      .then(index => {
        this.idx = lunr.Index.load(index);
        this.input.disabled = false;
      });
  }
}

export default Search;
