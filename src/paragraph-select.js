class ParagraphItem {
  constructor(data, api, paragraph, complianceList, complianceChart) {
    this.elem = document.createElement('li');
    this.api = api;
    this.paragraph = paragraph;
    this.complianceList = complianceList;
    this.complianceChart = complianceChart;
    this.data = data;
    this.elem.innerHTML = `${this.data.paragraphNumber} - ${
      this.data.paragraphTitle
    }`;
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
    paragraphSelect.innerHTML = `&para; ${this.data.paragraphNumber} - ${
      this.data.paragraphTitle
    }`;
    this.paragraph.update(this.data);
    this.api.getComplianceByParagraph(this.data.id).then(data => {
      this.api.getAllReports().then(reports => {
        for (let i = 0; i < data.length; i++) {
          data[i].report = reports[i];
        }
        this.complianceChart.update(data);
      });
    });
  }
}

class ParagraphSelect {
  constructor(api, paragraph, complianceList, complianceChart) {
    this.complianceList = complianceList;
    this.complianceChart = complianceChart;
    this.api = api;
    this.paragraph = paragraph;
    this.timeout;
    this.active = false;
    this.disabled = false;
    this.elem = document.querySelector('.paragraph-select');
    this.dropdown = document.querySelector('.paragraph-list');
    this.createList = this.createList.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.filterList = this.filterList.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
    this.paragraphs = [];
    this.addEventListeners();
  }

  createList(data) {
    const frag = document.createDocumentFragment();
    for (const obj of data) {
      const paragraphItem = new ParagraphItem(
        obj,
        this.api,
        this.paragraph,
        this.complianceList,
        this.complianceChart
      );
      this.paragraphs.push(paragraphItem);
      frag.appendChild(paragraphItem.elem);
    }
    this.paragraphs[0].selectParagraph();
    this.dropdown.appendChild(frag);
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
