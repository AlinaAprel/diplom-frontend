export class Popup {
  constructor(form, element, classOpenPopup) {
    this.form = form;
    this.element = element;
    this.classOpenPopup = classOpenPopup;
  }

  toSignIn() {
    this.element.classList.remove(this.classOpenPopup)
  }

  clearContent() {
    this.form.reset();
  }

  open() {
    this.element.classList.remove(this.classOpenPopup)
  }

  close() {
    this.element.classList.add(this.classOpenPopup)
  }
}