import Cookies from 'universal-cookie';
let cookie = new Cookies();

export default class HttpService {
  constructor () {}

  post (options) {
    return new Promise((resolve, reject) => {
      fetch(options.url, {
        body: JSON.stringify(options.body),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + cookie.get("userId")
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
      fetch(options.url, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + cookie.get("userId")
        }
      }).then(response => {
        return response.json()
      }).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  }
}