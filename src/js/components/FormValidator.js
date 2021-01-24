// export class FormValidator {
//   constructor(form, button) {
//     this.form = form;
//     this.button = button;
//   }

//   checkInputRequired(input, error) {
//     if (input.value.length === 0) {
//       error.textContent = 'Это обязательное поле';
//     }
//   }

//   checkEmail(input, error) {
//     if (input.pattern === false) {
//       error.validationMessage = 'Неверная почта'
//     }
//   }
// }

export class FormValidator {
  constructor(form, patternEmail, button) {
    this.form = form;
    this.pattern = patternEmail;
    this.button = button;
  }

  checkInputValidity(input, error) {
    if (input.value.length === 0) {
      error.validationMessage = 'Это обязательное поле';
      return false
    } else if (input.type === 'email') {
      if (this.pattern.test(input.value.toLowerCase()) === true) {
        error.validationMessage = '';
        return true
      } else {
        error.validationMessage = 'Недостоверный email';
        return false
      }
    } else {
      error.validationMessage = '';
      return true;
    }
  }

  inputValid(input) {
    const error = input.parentNode.querySelector(`#${input.id}__error `);
    const checkInput = this.checkInputValidity(input, error);
    error.textContent = error.validationMessage;
    return checkInput;
  }

  validityForm() {
  const inputs = [...this.form.querySelectorAll('.popup__input')];
  let checkInput = true;

  inputs.forEach((input) => {
    if (input.type !== 'submit' && input.type !== 'button') {
      if (!this.inputValid(input)) {
        checkInput = false;
      }
    }
  });
  return checkInput;
  }

  removeClassButton() {
    this.button.disabled = true;
    this.button.classList.remove('popup__button_active');
    this.button.classList.add('popup__button');
  }

  setSubmitButton() {
    if (this.form.checkValidity() === false) {
      this.removeClassButton();
    }
    else {
      this.button.disabled = false;
      this.button.classList.remove('popup__button')
      this.button.classList.add('popup__button_active')
    }
  }
}
