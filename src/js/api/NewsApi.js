export class NewsApi {
  constructor(config, serverUrl) {
    this.url = serverUrl;
    this.headers = config.headers;
}

  getNews() {
    return fetch(`${this.url}`, {
      method: 'GET',
      headers: this.headers
    })
    .then((result) => {
      if(result.ok) {
        console.log(result)
        return result.json()
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    })
  }
}