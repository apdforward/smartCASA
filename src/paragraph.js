import { replaceTerms } from './glossary';

class Paragraph {
  constructor() {
    this.title = document.querySelector('.js-paragraph__title');
    this.body = document.querySelector('.js-paragraph__body');
    this.setState = this.setState.bind(this);
  }

  setState(props) {
    this.title.innerHTML = `${props.paragraph_number} - ${
      props.paragraph_title
    }`;
    this.body.innerHTML = props.paragraph_text;
    replaceTerms(props.paragraph_body);
  }
}

export default Paragraph;
