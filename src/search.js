/* eslint-disable no-invalid-this */

import lunr from 'lunr';

class Search {
  constructor(paragraphSelect) {
    this.paragraphSelect = paragraphSelect;
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
      this.paragraphSelect.filter = [];
      this.paragraphSelect.removeFilter();
      if (this.input.value.length > 2) {
        const refs = this.idx.search(this.input.value);
        const filteredParagraphs = refs.map(p => parseInt(p.ref));
        this.paragraphSelect.filter = filteredParagraphs;
        this.paragraphSelect.filterList();
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
