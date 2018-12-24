import { replaceTerms } from './glossary';

class ParagraphItem {
  constructor(props) {
    this.elem = document.createElement('li');
    this.id = props.id;
    this.paragraphNumber = props.paragraph_number;
    this.paragraphTitle = props.paragraph_title;
    this.paragraphText = props.paragraph_text;
    this.elem.innerHTML = `${this.paragraphNumber} - ${this.paragraphTitle}`;
    this.selectParagraph = this.selectParagraph.bind(this);

    this.addEventListeners();
  }

  addEventListeners() {
    this.elem.addEventListener('click', this.selectParagraph);
  }

  show() {
    this.elem.classList.remove('paragraph-choice--hidden');
  }

  hide() {
    this.elem.classList.add('paragraph-choice--hidden');
  }

  selectParagraph() {
    const paragraphSelect = document.querySelector('.selected-paragraph');
    paragraphSelect.innerHTML = `${this.paragraphNumber} - ${
      this.paragraphTitle
    }`;
    const paragraphTitle = document.querySelector('.js-paragraph__title');
    const paragraphBody = document.querySelector('.js-paragraph__body');
    paragraphTitle.innerHTML = `${this.paragraphNumber} - ${
      this.paragraphTitle
    }`;
    paragraphBody.innerHTML = this.paragraphText;
    const paragraphTerms = replaceTerms(paragraphBody.innerHTML);
    paragraphBody.innerHTML = '';
    paragraphBody.append(paragraphTerms);
  }
}

class ParagraphSelect {
  constructor(api) {
    this.api = api;
    this.timeout;
    this.active = false;
    this.disabled = false;
    this.elem = document.querySelector('.paragraph-select');
    this.dropdown = document.querySelector('.paragraph-list');
    this.setParagraphList = this.setParagraphList.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.filterList = this.filterList.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.paragraphs = [];

    this.setParagraphList();
    this.addEventListeners();
  }

  setParagraphList(paragraph) {
    const paragraphData = this.api.getAllParagraphs();
    paragraphData.then(objs => {
      const frag = document.createDocumentFragment();
      for (const obj of objs) {
        const paragraphItem = new ParagraphItem(obj);
        this.paragraphs.push(paragraphItem);
        frag.appendChild(paragraphItem.elem);
      }
      this.paragraphs[0].selectParagraph();
      this.dropdown.appendChild(frag);
    });
  }

  addEventListeners() {
    this.elem.addEventListener('click', this.toggleDropdown);
  }

  toggleDropdown() {
    clearTimeout(this.timeout);
    const nParagraphs = this.dropdown.childNodes.length;
    if (this.active) {
      this.elem.classList.remove('paragraph-select--active');
      this.dropdown.style.height = '0px';
      this.active = false;
      this.timeout = setTimeout(() => {
        this.dropdown.classList.remove('paragraph-list--overflow');
      }, 400);
    } else {
      this.dropdown.style.height = `${nParagraphs * 36}px`;
      this.elem.classList.add('paragraph-select--active');
      this.active = true;
      this.timeout = setTimeout(() => {
        this.dropdown.classList.add('paragraph-list--overflow');
      }, 400);
    }
  }

  removeFilter() {
    this.paragraphs.map(paragraph => {
      paragraph.show();
    });
  }

  filterList(filter) {
    this.paragraphs.map(paragraph => {
      if (filter.indexOf(paragraph.id) != 1) {
        paragraph.hide();
      }
    });
  }
}

export default ParagraphSelect;
