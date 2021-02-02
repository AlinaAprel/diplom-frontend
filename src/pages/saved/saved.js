import '../saved/saved.css'
import {MainApi} from '../../js/api/MainApi';
import {NewsCard} from '../../js/components/NewsCard';

const savedCardsList = document.querySelector('.saved-cards__list');
const numberOfCards = document.querySelector('#number');
const allThemeText = document.querySelector('.results__theme')
const nameUser = document.querySelector('.header__greta-link');
const nameUserText = document.querySelector('#name');

const serverMainApiUrl = 'https://yandex.diplom.students.nomoreparties.space';

const main = new MainApi(serverMainApiUrl);
const newsCard = new NewsCard(savedCardsList)

function backToMain() {
  main.getUser()
  .then((res) => {
    if (res === 401) {
      window.location.href = 'index.html'
    }
  })
}

backToMain()

const name = localStorage.getItem('name');
nameUser.textContent = name;
nameUserText.textContent = name;

main.getArticles()
.then((res) => {
  newsCard.setMainApi(main)
  const cards = res.data;
  numberOfCards.textContent = cards.length;
  if (numberOfCards.textContent === '0') {
    numberOfCards.textContent = 'нет';
    allThemeText.textContent = ''
  } else {
    allThemeText.textContent = keywordRating(cards)
  }

  cards.forEach((card) => {
    newsCard.showAllSavedCards(card)
  })
})

function keywordRating(cards) {
  const keywords = cards.map((item) => item.keyword);
  const countKey = keywords.reduce((sum, item) => {
      sum[item] = (sum[item] || 0) + 1;
      return sum;
    }, []);
  const sorted = Object.entries(countKey).sort((a, b) => b[1] - a[1]);
  const unique = sorted.map((item) => item[0]);
  if (unique.length === 0) {
      return ""
  } else if (unique.length === 1) {
      return `По ключевому слову: ${unique[0]}`;
  } else if (unique.length === 2) {
      return `По ключевым словам: ${unique[0]} и ${unique[1]}`;
  } else if (unique.length === 3) {
      return `По ключевым словам: ${unique[0]}, ${unique[1]} и ${unique[2]}`;
  } else if (unique.length >= 4) {
      return `По ключевым словам: ${unique[0]}, ${unique[1]} и ${unique.length - 2} другим`;
  }
}