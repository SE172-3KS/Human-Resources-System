export default class HttpService {
  constructor () {}

  post (options) {
    return new Promise((resolve, reject) => {
      fetch(options.url, {
        body: JSON.stringify(options.body),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST'
      }).then(response => {
        return response.json();
      }).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  }

  get (options) {
    return new Promise((resolve, reject) => {
      fetch(options.url).then(response => {
        return response.json()
      }).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  }
}