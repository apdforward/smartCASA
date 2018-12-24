class FilterPanel {
  constructor(paragraphSelect) {
    this.active = false;
    this.paragraphSelect = paragraphSelect;
    this.btn = document.querySelector('.filter-btn');
    this.toggleFilterPanel = this.toggleFilterPanel.bind(this);
    this.addEventListeners();
  }

  addEventListeners() {
    this.btn.addEventListener('click', this.toggleFilterPanel);
  }

  toggleFilterPanel() {
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

export default FilterPanel;
