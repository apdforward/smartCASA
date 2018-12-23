class Snack {
  constructor() {
    this.timeOut;
    this.elem = document.querySelector('.snack');
  }

  showSnack() {
    clearTimeout(this.timeOut);
    this.elem.classList.add('snack--visible');
    this.timeOut = setTimeout(() => {
      this.elem.classList.remove('snack--visible');
    }, 2500);
  }
}

export default Snack;
