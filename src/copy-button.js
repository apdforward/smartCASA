import Snack from './snack';

class CopyButton {
  constructor() {
    this.btn = document.querySelector('.js-copy-btn');
    this.snack = new Snack();
    this.copyText = this.copyText.bind(this);
    this.addEventListeners();
  }

  addEventListeners() {
    this.btn.addEventListener('click', this.copyText);
  }

  copyText() {
    this.btn.classList.add('copy-btn--clicked');
    setTimeout(() => {
      this.btn.classList.remove('copy-btn--clicked');
    }, 300);
    const text = document.querySelector('.paragraph__body').innerHTML;
    const cleanText = text.replace(/<(?:.|\n)*?>/gm, '');
    const textarea = document.createElement('textarea');
    textarea.value = cleanText;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    this.snack.showSnack();
  }
}

export default CopyButton;
