export class NewsApi {
  constructor(serverUrl) {
    this.url = serverUrl;
    this.apiKey = '0105ea013c2149a7861a4d8c6b66d6b9'
  }
  getNews(theme, time) {
    return fetch(`${this.url}q=${theme}$from=${time.getDate() - 7}$to=${time.getDate()}&pageSize=${100}&apiKey=${this.apiKey}`)
    .then((res) => {
      return res.json()
    })
    .catch((err) => {
      return err
    })
  }
}