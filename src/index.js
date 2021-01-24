import '../src/style.css'
import {Popup} from '../src/js/components/Popup'
import {FormValidator} from '../src/js/components/FormValidator';

import {NewsApi} from '../src/js/api/NewsApi';
import {MainApi} from '../src/js/api/MainApi';

// popup входа
const popupLoginDisabled = document.querySelector('#popup-signin');
const inputLoginDisabled = document.querySelector('#input-signin');

// popup регистрации
const popupSignup = document.querySelector('#popup-signup');
const popupSignupForm = document.querySelector('#signup-form');
const btnAuthorization = document.querySelector('.header__rectangle');
const btnSubmitSignUp = document.querySelector('#button-signup');
const popupSignUpInputEmail = document.querySelector('#signup-input-email');
const popupSignUpInputParol = document.querySelector('#signup-input-parol')
const popupSignUpInputName = document.querySelector('#signup-input-name');


const btnSignIn = document.querySelector('.header__greta')

const btnCloseSignUp = document.querySelector('#close-signup');
const btnSearchInput = document.querySelector('.search__input-button');

const patternEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;


const serverMainApiUrl = 'https://www.yandex.diplom.students.nomoreparties.space';
const serverNewsApiUrl = 'https://nomoreparties.co/news/v2/top-headlines?country=us&apiKey=0105ea013c2149a7861a4d8c6b66d6b9';
// const config = {
//   headers: {
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     'Access-Control-Allow-Headers': 'Content-Type, origin, x-access-token, authorization, credentials'
//   }
// }
// const popup = new Popup(inputLoginDisabled, popupLoginDisabled, 'disabled');
const popupAuthorization = new Popup(popupSignupForm, popupSignup, 'disabled');
const formSignUpValidity = new FormValidator(popupSignupForm, patternEmail, btnSubmitSignUp);

const news = new NewsApi(serverNewsApiUrl);
const main = new MainApi(serverMainApiUrl);

btnAuthorization.addEventListener('click',() => {
  popupAuthorization.open();
})

popupSignupForm.addEventListener('input', () => {
  formSignUpValidity.validityForm();
  formSignUpValidity.setSubmitButton();
})

btnSubmitSignUp.addEventListener('click', () => {
  console.log('click')
  main.signup(popupSignUpInputEmail.value, popupSignUpInputParol.value, popupSignUpInputName.value);
  console.log(popupSignUpInputEmail.value, popupSignUpInputParol.value, popupSignUpInputName.value)
})

btnCloseSignUp.addEventListener('click', () => {
  popupAuthorization.close();
  popupAuthorization.clearContent()
})

btnSearchInput.addEventListener('click', () => {
  news.getNews();
})