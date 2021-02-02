export class NewsCardList {
  constructor(list) {
    this.list = list;
    this.count = 0;
    this.countStart = 0;
  }

  renderElement(card, statement) {
    if (statement === true) {
      this.list.appendChild(card)
    }
  }

  createCard(card) {
    this.card = card;
    const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];
    let createDate = new Date(this.card.date)
    let date = [createDate.getDate() + ' ' + monthNames[createDate.getMonth() + 1] + ',' + ' ' + createDate.getFullYear()];
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('result-cards__container');

    const linkSource = document.createElement('a');
    linkSource.classList.add('result-cards__link');
    linkSource.setAttribute('src', `${this.card.link}`)

    const cardImageButton = document.createElement('button');
    cardImageButton.classList.add('result-cards__save');

    const cardSaveImage = document.createElement('div');
    cardSaveImage.classList.add('result-cards__save-img');

    const cardImage = document.createElement('img');
    cardImage.classList.add('result-cards__image');
    cardImage.setAttribute('src', `${this.card.image}`)

    const cardTime = document.createElement('p');
    cardTime.classList.add('result-cards__time');
    cardTime.textContent = date;

    const cardHeader = document.createElement('h2');
    cardHeader.classList.add('result-cards__header');
    cardHeader.textContent = this.card.title;

    const cardText = document.createElement('p');
    cardText.classList.add('result-cards__text');
    cardText.textContent = this.card.text;

    const cardAuthor = document.createElement('p');
    cardAuthor.classList.add('result-cards__author');
    cardAuthor.textContent = this.card.source;

    cardImageButton.appendChild(cardSaveImage);
    linkSource.appendChild(cardImageButton);
    linkSource.appendChild(cardImage);
    linkSource.appendChild(cardTime);
    linkSource.appendChild(cardHeader);
    linkSource.appendChild(cardText);
    linkSource.appendChild(cardAuthor);
    cardContainer.appendChild(linkSource);

    this.saveImage(cardContainer, this.card.data)

      this.count += 1;
      this.countStart += 1;
      if (this.count < 3 || this.count === 3) {
        this.renderElement(cardContainer, true)
      } else {
        this.renderElement(cardContainer, false)
      }
  }

  addCore(articles, keyword) {
    const threeArticles = Array.of(articles[this.countStart], articles[this.countStart + 1], articles[this.countStart + 2])
    threeArticles.forEach((item) => {
      const cards = {
        data: keyword,
        title: item.title || 'Заголовок',
        text: item.content || 'Текст отстутствует',
        date: item.publishedAt || 'До н.э.',
        source: item.source.name || 'Ресурс не указан',
        link: item.url || 'Ссылки нет',
        image: item.urlToImage || 'https://i.pinimg.com/originals/8a/eb/d8/8aebd875fbddd22bf3971c3a7159bdc7.png'
      }
      this.createCard(cards)
    })
  }

  showMore(articles, data) {
    this.count = 0;
    this.addCore(articles, data)
  }

  setMainApi(main) {
    this.main = main;
  }

  saveImage(card, keyword) {
    this.main.getUser()
    .then((res) => {
      if (res === 401) {
        card.addEventListener('click', (event) => {
          if (event.target.classList.contains('result-cards__save-img')) {
            event.target.classList.add('saved-cards__no-saved')
          }
        })
      } else {
        card.addEventListener('click', (event) => {
          if (event.target.classList.contains('result-cards__save-img')) {
            event.target.classList.toggle('result-cards__saved-img')
          }

          if (event.target.classList.contains('result-cards__saved-img')) {
            this.keyword = keyword;
            this.title = card.querySelector('.result-cards__header').textContent;
            this.text = card.querySelector('.result-cards__text').textContent;
            this.date = card.querySelector('.result-cards__time').textContent;
            this.source = card.querySelector('.result-cards__author').textContent;
            this.link = card.querySelector('.result-cards__link').getAttribute('src');
            this.image = card.querySelector('.result-cards__image').src;
            this.main.createArticle(this.keyword, this.title, this.text, this.date, this.source, this.link, this.image)
            .then((res) => {
              console.log(res)
            })
            .catch((err) => {
              console.log(err)
            })
          }
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

  clear() {
    while (this.list.firstChild) this.list.removeChild(this.list.firstChild);
    this.count = 0;
    this.articlesNumber = 0;
}
}