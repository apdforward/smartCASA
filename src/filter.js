class Filter {
  constructor() {
    this.active = false;
    this.btn = document.querySelector('.filter-btn');
    console.log(this.btn);
    this.showFilterPanel = this.showFilterPanel.bind(this);
    this.addEventListeners();
  }

  addEventListeners() {
    this.btn.addEventListener('click', this.showFilterPanel);
  }

  showFilterPanel() {
    const filterPanel = document.querySelector('.js-filter-panel');
    if (this.active) {
      filterPanel.classList.remove('filter-panel--visible');
      this.btn.classList.remove('filter-btn--active');
      this.active = false;
    } else {
      filterPanel.classList.add('filter-panel--visible');
      this.btn.classList.add('filter-btn--active');
      this.active = true;
    }
  }
}

export default Filter;
