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
          'Authorization': getAuthorization()
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
          'Authorization': getAuthorization()
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

function getAuthorization () {
  let bearer = 'Bearer ' + cookie.get("email");
  console.log(bearer)
  return bearer
}