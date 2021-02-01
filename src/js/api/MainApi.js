export class MainApi {
  constructor(serverMainApiUrl) {
    this.url = serverMainApiUrl;
}

  signup(email, password, name) {
    return fetch(`${this.url}/signup`, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        password: password,
        email: email,
      }),
    })
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err.message
    })
  }

  signin(email, password) {
    return fetch(`${this.url}/signin`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password: password,
            email: email,
        })
    })
    .then((res) => {
        return res.json()
    })
    .catch((err) => {
      return err
    })
}

  createArticle(keyword, title, text, date, source, link, image) {
    return fetch(`${this.url}/articles`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({
        keyword: keyword,
        title: title,
        text: text,
        date: date,
        source: source,
        link: link,
        image: image,
      })
  })
  .then((res) => {
    console.log(res)
    return res.json()
  })
  .catch((err) => {
    return err
  })
  }

  getUser() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    })
    .then((res) => {
      return res.status
    })
  }

  getArticles() {
    return fetch(`${this.url}/articles`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    })
    .then((res) => {
      return res.json()
    })
  }

  deleteArticle(id) {
    return fetch(`${this.url}/articles/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      }
    })
    .then((res) => {
      return res.json()
    })
  }
}