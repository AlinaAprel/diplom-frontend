export class Menu {
  constructor(menuClassDisabled, menuSignup, menuSignin) {
    this.class = menuClassDisabled;
    this.menuSignup = menuSignup;
    this.menuSignin = menuSignin;
  }

  // Меню аккаунта
  isSignIn() {
    this.menuSignin.classList.remove(this.class)
    this.menuSignup.classList.add(this.class)
  }

  // Меню авторизации
  isSignUp() {
    this.menuSignin.classList.add(this.class)
    this.menuSignup.remove(this.class)
  }
}