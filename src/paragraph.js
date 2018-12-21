import replaceTerms from './glossary';

class Paragraph {
  constructor() {
    this._title = document.querySelector('.paragraph__title');
    this._body = document.querySelector('.paragraph__body');
  }

  set title(str) {
    this._title.innerHTML = str;
  }

  set body(str) {
    this._body.innerHTML = str;
    replaceTerms(str);
  }
}

export default Paragraph;
