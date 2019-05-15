class Help {
  constructor(className, message) {
    this.elem = document.querySelector(className);
    this.message = message;
    this.className = className;
    this.timeOut;
    this.active = false;
    const boxElem = document.createElement('div');
    this.messageBox = this.elem.parentNode.parentNode.appendChild(boxElem);
    this.messageBox.classList.add('message-box');
    this.messageBox.classList.add('message-box--hidden');
    this.messageBox.appendChild(this.message);

    this.showMessage = this.showMessage.bind(this);
    this.addEventListeners();
  }

  addEventListeners() {
    this.elem.addEventListener('click', this.showMessage);
  }

  showMessage() {
    clearTimeout(this.timeOut);
    if (this.active) {
      this.messageBox.classList.remove('message-box--show');
      this.messageBox.classList.add('message-box--hidden');
      this.active = false;
    } else {
      this.active = true;
      const rect = this.elem.getBoundingClientRect();
      const left = rect.left + window.scrollX;
      const height = rect.bottom - rect.top;
      this.messageBox.style.left = left;
      this.messageBox.style.bottom = `${20 + height}px`;
      this.messageBox.classList.remove('message-box--hidden');
      this.messageBox.classList.add('message-box--show');

      this.timeOut = setTimeout(() => {
        this.messageBox.classList.remove('message-box--show');
        this.messageBox.classList.add('message-box--hidden');
        this.active = false;
      }, 10000);
    }
  }
}

export default Help;
