class Snack {
  constructor() {
    this.timeOut;
    this.elem = document.querySelector('.snack');
  }

  showSnack() {
    clearTimeout(this.timeOut);
    this.elem.classList.add('snack--show');
    this.elem.classList.remove('snack--hidden');
    this.timeOut = setTimeout(() => {
      this.elem.classList.remove('snack--show');
      this.elem.classList.add('snack--hidden');
    }, 2000);
  }
}

export default Snack;
