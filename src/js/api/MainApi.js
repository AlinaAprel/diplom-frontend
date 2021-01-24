export class MainApi {
  constructor(serverMainApiUrl) {
    this.url = serverMainApiUrl;
  }

  signup(email, password, name) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        password: password,
        email: email,
      }),
      credentials: 'include'
    })
    .then((result) => {
      if (result.ok) {
        return result.json()
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`))
    })

  }

  signin() {

  }

  getUserData() {

  }

  getArticles() {

  }

  createArticle() {

  }

  removeArticle() {

  }
}