import replaceTerms from './glossary';

class Paragraph {
  constructor() {
    this.title = document.querySelector('.js-paragraph__title');
    this.body = document.querySelector('.js-paragraph__body');
    this.setState = this.setState.bind(this);
  }

  setState(props) {
    const paragraphNumber = props.paragraph_number || '';
    this.title.innerHTML = `Paragraph ${paragraphNumber}`;
    this.body.innerHTML = props.paragraph_text || '';
    replaceTerms(props.paragraph_body);
  }
}

export default Paragraph;
