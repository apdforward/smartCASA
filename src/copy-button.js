class CopyButton {
  constructor() {
    this.btn = document.querySelector('.paragraph__copy-btn');
    this.copyText = this.copyText.bind(this);
    this.addEventListeners();
  }

  addEventListeners() {
    this.btn.addEventListener('click', this.copyText);
    this.btn.addEventListener('click', CopyButton.showSnack);
  }

  copyText() {
    this.btn.classList.add('paragraph__copy-btn--clicked');
    setTimeout(() => {
      this.btn.classList.remove('paragraph__copy-btn--clicked');
    }, 300);
    const text = document.querySelector('.paragraph__body').innerHTML;
    const cleanText = text.replace(/<(?:.|\n)*?>/gm, '');
    const el = document.createElement('textarea');
    el.value = cleanText;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  static showSnack() {
    const snack = document.querySelector('.snack');
    snack.classList.add('snack--show');
    snack.classList.remove('snack--hidden');
    setTimeout(() => {
      snack.classList.remove('snack--show');
      snack.classList.add('snack--hidden');
    }, 2000);
  }
}

export default CopyButton;
