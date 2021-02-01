export class NewsCard {
  constructor(savedCardsList) {
    this.savedCardsList = savedCardsList;
  }

  showAllSavedCards(card) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('saved-cards__container');
    cardContainer.setAttribute('src', `${card.link}`)

    const cardTheme = document.createElement('button');
    cardTheme.classList.add('saved-cards__theme');
    cardTheme.textContent = card.keyword;

    const cardDelete = document.createElement('button');
    cardDelete.classList.add('saved-cards__delete');

    const cardDeleteImg = document.createElement('div');
    cardDeleteImg.classList.add('saved-cards__delete-img');

    const cardImage = document.createElement('img');
    cardImage.classList.add('saved-cards__image');
    cardImage.setAttribute('src', `${card.image}`)

    const cardTime = document.createElement('p');
    cardTime.classList.add('saved-cards__time');
    cardTime.textContent = card.date;

    const cardHeader = document.createElement('h2');
    cardHeader.classList.add('saved-cards__header');
    cardHeader.textContent = card.title;

    const cardText = document.createElement('p');
    cardText.classList.add('saved-cards__text');
    cardText.textContent = card.text;

    const cardAuthor = document.createElement('p');
    cardAuthor.classList.add('saved-cards__author');
    cardAuthor.textContent = card.source;

    cardDelete.appendChild(cardDeleteImg);
    cardContainer.appendChild(cardImage);
    cardContainer.appendChild(cardDelete);
    cardContainer.appendChild(cardTheme);
    cardContainer.appendChild(cardTime);
    cardContainer.appendChild(cardHeader);
    cardContainer.appendChild(cardText);
    cardContainer.appendChild(cardAuthor);

    this.savedCardsList.appendChild(cardContainer);

    this.cardDelete(cardDeleteImg, card._id)
  }

  cardDelete(cardDeleteImg, id) {
    cardDeleteImg.addEventListener('click', (event) => {
      console.log('click')
      if (event.target.classList.contains('saved-cards__delete-img')) {
        console.log('click2')
        console.log(this.savedCardsList)
        this.main.deleteArticle(id)
        .then((res) => {
          if (res.message === 'Карточка удалена!') {
            this.savedCardsList.removeChild(event.target.closest('.saved-cards__container'))
          }
        })
      }
    })
  }

  setMainApi(main) {
    this.main = main;
  }
}