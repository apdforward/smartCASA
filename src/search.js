/* eslint-disable no-invalid-this */

import lunr from 'lunr';

class Search {
  constructor(subscriber) {
    this.subscriber = subscriber;
    this.input = document.querySelector('.topic-search');
    this.idx;
    this.timeout;

    this.inputOnChange = this.inputOnChange.bind(this);
    this.loadIndex = this.loadIndex.bind(this);
    this.loadIndex();
    this.addEventListeners();
  }

  addEventListeners() {
    this.input.addEventListener('keydown', this.inputOnChange);
  }

  inputOnChange() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (this.input.value.length > 2) {
        const refs = this.idx.search(this.input.value);
        const filteredParagraphs = refs.map(p => parseInt(p.ref));
        this.subscriber.publish('paragraph-filter', filteredParagraphs);
      }
    }, 800);
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
