class Topic {
  constructor(props, api, paragraphSelect) {
    this.api = api;
    this.paragraphSelect = paragraphSelect;
    this.id = props.id;
    this.value = props.value;
    this.active = false;
    this.elem = document.createElement('div');
    this.elem.classList.add('topic__chip');
    this.elem.innerHTML = this.value;
  }
}

class CategoryTopic extends Topic {
  constructor(props, api, paragraphSelect) {
    super(props, api, paragraphSelect);
    this.activate = this.activate.bind(this);
    this.deactivate = this.deactivate.bind(this);
    this.addEventListeners();
  }
  addEventListeners() {
    this.elem.addEventListener('click', () => {
      if (this.active) {
        this.paragraphSelect.removeFilter();
        this.active = false;
        this.deactivate();
      } else {
        this.active = true;
        this.activate();
      }
    });
  }

  activate() {
    const activeChips = Array.prototype.slice.call(
      document.querySelectorAll(`.category-${this.id} .topic__chip--active`)
    );
    for (const chip of activeChips) {
      chip.classList.remove('topic__chip--active');
    }
    this.elem.classList.add('topic__chip--active');
    const specificTopics = document.querySelectorAll(`.category-${this.id}`);
    for (const topic of specificTopics) {
      topic.classList.remove('topic__chip--hidden');
      topic.classList.add('topic__chip--show');
    }
  }

  deactivate() {
    this.elem.classList.remove('topic__chip--active');
    const specificTopics = Array.prototype.slice.call(
      document.querySelectorAll(`.category-${this.id}`)
    );
    for (const topic of specificTopics) {
      topic.classList.add('topic__chip--hidden');
      topic.classList.remove('topic__chip--show');
      topic.classList.remove('topic__chip--active');
    }
  }
}

class SpecificTopic extends Topic {
  constructor(props, api, paragraphSelect) {
    super(props, api, paragraphSelect);
    this.elem.setAttribute('value', this.value);
    this.elem.classList.add(`category-${props.categoryId}`);
    this.elem.classList.add('topic__chip--hidden');
    this.activate = this.activate.bind(this);
    this.deactivate = this.deactivate.bind(this);
    this.addEventListeners();
  }
  addEventListeners() {
    this.elem.addEventListener('click', () => {
      if (this.active) {
        this.paragraphSelect.removeFilter();
        this.active = false;
        this.deactivate();
      } else {
        this.active = true;
        this.activate();
      }
    });
  }

  activate() {
    this.elem.classList.add('topic__chip--active');
  }

  deactivate() {
    this.elem.classList.remove('topic__chip--active');
  }
}

export { SpecificTopic, CategoryTopic };
