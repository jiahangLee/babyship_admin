import fetch from 'dva/fetch';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status <= 300) {
    response.headers.forEach((v,k)=>console.log(k,v))
    if(response.headers.get("token") && response.headers.get("token") != null)
      sessionStorage.setItem("token",response.headers.get("token"))

    return response;
  }else if(response.status === 500){
    return response
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data=>({data}))
    .catch(err => ({ err }));
}
