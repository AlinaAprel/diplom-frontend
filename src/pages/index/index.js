import '../index/index.css'
import {Popup} from '../../js/components/Popup'
import {FormValidator} from '../../js/components/FormValidator';
import {Menu} from '../../js/components/Menu';

import {NewsApi} from '../../js/api/NewsApi';
import {MainApi} from '../../js/api/MainApi';
import {NewsCardList} from '../../js/components/NewsCardList';

// popup входа
const btnMenuSignIn = document.querySelector('.header__greta');
const popupSignIn = document.querySelector('#popup-signin');
const popupFormSignIn = document.querySelector('#input-signin');
const btnSubmitSignIn = document.querySelector('#button-signin');
const popupSignInInputEmail = document.querySelector('#signin-input-email');
const popupSignInInputParol = document.querySelector('#signin-input-parol');
const linkSignIn = document.querySelector('#link-for-signin');

// popup вход после регистрации
const logIn = document.querySelector('.signup');
const linkForLogIn = document.querySelector('#link-for-login');

// popup регистрации
const popupSignup = document.querySelector('#popup-signup');
const popupSignupForm = document.querySelector('#signup-form');
const btnAuthorization = document.querySelector('.header__rectangle');
const btnSubmitSignUp = document.querySelector('#button-signup');
const popupSignUpInputEmail = document.querySelector('#signup-input-email');
const popupSignUpInputParol = document.querySelector('#signup-input-parol')
const popupSignUpInputName = document.querySelector('#signup-input-name');
const linkSignUp = document.querySelector('#link-for-signup');

const btnCloseSignUp = document.querySelector('#close-signup');
const btnCloseSignIn = document.querySelector('#close-signin');
const errorFormSignIn = document.querySelector('.popup__error_signin');
const errorFormSignUp = document.querySelector('.popup__error_signup');

const patternEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

// URL API
const serverMainApiUrl = 'https://yandex.diplom.students.nomoreparties.space';
const serverNewsApiUrl = 'https://nomoreparties.co/news/v2/everything?';

// POPUP
const popupAuthorization = new Popup(popupSignupForm, popupSignup, 'disabled');
const popupEntery = new Popup(popupFormSignIn, popupSignIn, 'disabled');
const popupLogin = new Popup(popupFormSignIn, logIn, 'disabled')

// FORM VALIDITY
const formSignUpValidity = new FormValidator(popupSignupForm, patternEmail, btnSubmitSignUp);
const formSignInValidity = new FormValidator(popupFormSignIn, patternEmail, btnSubmitSignIn)

// CARDS
const noResult = document.querySelector('.result');
const preloader = document.querySelector('.preloader');
const resultBlock = document.querySelector('.result-cards');
const list = document.querySelector('.result-cards__list');
const linkSaved = document.querySelector('#link-saved');
const btnShowMore = document.querySelector('.result-cards__button');
const nameUser = document.querySelector('.header__greta-link');
let time = new Date()

const name = localStorage.getItem('name')
const savedMenu = document.querySelector('.header__saved');

// RENDER
const newsCardList = new NewsCardList(list)

// MENU
const menu = new Menu('disabled', btnAuthorization, btnMenuSignIn)

// SEARCH
const btnSearch = document.querySelector('.search__input-button');
const inputSearch = document.querySelector('.search__input-text');
const errorSearch = document.querySelector('.search__error');

// CONST API
const news = new NewsApi(serverNewsApiUrl);
const main = new MainApi(serverMainApiUrl);

// AUTHORIZATION
btnAuthorization.addEventListener('click',() => {
  popupAuthorization.open();
})

popupSignupForm.addEventListener('input', () => {
  formSignUpValidity.validityForm();
  formSignUpValidity.setSubmitButton();
})

btnSubmitSignUp.addEventListener('click', (event) => {
  event.preventDefault()
  main.signup(popupSignUpInputEmail.value, popupSignUpInputParol.value, popupSignUpInputName.value)
  .then((res) => {
    if (res === 'Пользователь уже зарегистрирован') {
      errorFormSignUp.textContent = 'Пользователь уже зарегистрирован!';
      formSignUpValidity.removeClassButton()
    } else {
      localStorage.setItem('name', res.data.name);
      const name = localStorage.getItem('name')
      nameUser.textContent = name;
      errorFormSignUp.textContent = '';
      popupAuthorization.close()
      popupLogin.toSignIn()
    }
  })
  .catch((err) => {
    return err.message
  })
})

btnCloseSignUp.addEventListener('click', () => {
  popupAuthorization.close();
  popupAuthorization.clearContent();
})

linkSignUp.addEventListener('click', () => {
  popupAuthorization.open();
  popupEntery.close();
})

// ENTRY
btnMenuSignIn.addEventListener('click', () => {
  popupEntery.open()
})

btnCloseSignIn.addEventListener('click', () => {
  popupEntery.close()
  popupEntery.clearContent()
})

popupFormSignIn.addEventListener('input', () => {
  formSignInValidity.validityForm()
  formSignInValidity.setSubmitButton()
})

btnSubmitSignIn.addEventListener('click', (event) => {
  event.preventDefault()
  main.signin(popupSignInInputEmail.value, popupSignInInputParol.value)
  .then((res) => {
    localStorage.setItem('token', res.token)
    localStorage.getItem('token')
    if (res.token !== undefined) {
      main.getUser()
      .then((res) => {
        if (res.data != undefined) {
          localStorage.setItem('name', res.data.name);
          const name = localStorage.getItem('name')
          nameUser.textContent = name;
          errorFormSignIn.textContent = '';
          savedMenu.classList.remove('disabled')
          menu.isSignIn()
          popupEntery.close()
          popupEntery.clearContent()
        }
      })
    }
    if (res.token === undefined) {
      errorFormSignIn.textContent = 'Необходима авторизация';
      formSignInValidity.removeClassButton()
    }
    if (res.message.toString().length > 0) {
      errorFormSignIn.textContent = res.message.toString();
      formSignInValidity.removeClassButton()
    }
  })
  .catch((err) => {
    return err.message
  })
})

linkSignIn.addEventListener('click', () => {
  popupEntery.open()
  popupAuthorization.close();
})

// LOG IN
linkForLogIn.addEventListener('click', () => {
  popupEntery.open()
  popupLogin.close()
})

// SEARCH
btnSearch.addEventListener('click', () => {
  resultBlock.classList.add('disabled')
  noResult.classList.add('disabled')
  newsCardList.clear()
    if (inputSearch.value.length > 0) {
      preloader.classList.remove('disabled')
      errorSearch.textContent = ''
      news.getNews(inputSearch.value, time)
      .then((res) => {
      if (res.articles.length > 3) {
        btnShowMore.classList.remove('disabled')
      }
      resultBlock.classList.remove('disabled')
      preloader.classList.add('disabled')
        if (res.articles.length === 0) {
          resultBlock.classList.add('disabled')
          noResult.classList.remove('disabled')
        }
          newsCardList.setMainApi(main)
          newsCardList.addCore(res.articles, inputSearch.value, linkSaved)
          btnShowMore.addEventListener('click', () => {
            newsCardList.showMore(res.articles, inputSearch.value)
          })
    })
  } else {
    errorSearch.textContent = 'Нужно ввести ключевое слово'
  }
})

main.getUser()
.then((res) => {
  if (res.data != undefined ) {
    btnMenuSignIn.classList.remove('disabled')
    savedMenu.classList.remove('disabled')
    btnAuthorization.classList.add('disabled')
    const name = localStorage.getItem('name')
    nameUser.textContent = name;
  } else {
    btnAuthorization.classList.remove('disabled')
    btnMenuSignIn.classList.add('disabled')
    savedMenu.classList.add('disabled')
  }
})
.catch((err) => {
  if (err.message === 'Ошибка: 401') {
    btnAuthorization.classList.remove('disabled')
    btnMenuSignIn.classList.add('disabled')
    savedMenu.classList.add('disabled')
    // formSignInValidity.removeClassButton()
  }
})