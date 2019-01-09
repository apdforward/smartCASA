import { replaceTerms } from './glossary';

class Paragraph {
  constructor() {
    this.title = document.querySelector('.js-paragraph__title');
    this.body = document.querySelector('.js-paragraph__body');
    this.update = this.update.bind(this);
  }

  update(data) {
    this.title.innerHTML = `${data.paragraphNumber} - ${data.paragraphTitle}`;
    const paragraphTerms = replaceTerms(data.paragraphText);
    this.body.innerHTML = '';
    this.body.append(paragraphTerms);
  }
}

export default Paragraph;
