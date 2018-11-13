import request from '../../utils/newrequest'
import config  from '../../utils/config'
import * as Base64 from "query-string";
// import * as Base64 from "qs";
// import Base64 from 'crypto-js/enc-base64';
var CryptoJS = require("crypto-js");
const { api } = config
//   export function fetch({username,password}) {
//     return login(`http://localhost:8002/babyship/login?id=${username}&&password=${password}`);
// }
export function fetch({username,password,remember}) {
  // Encrypt
  let ciphertext = CryptoJS.AES.encrypt(password, 'jiahanglee123456', {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).ciphertext;
  console.log(ciphertext.toString())
  console.log(JSON.stringify(CryptoJS.AES.encrypt(password, 'jiahanglee123456', {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })))
  console.log(CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(ciphertext)))
  // Decrypt
  // var bytes  = CryptoJS.AES.decrypt(ciphertext, 'jiahanglee');
  // var originalText = bytes.toString(CryptoJS.enc.Utf8);

  // console.log(ciphertext);
  // console.log(originalText); // 'my message'
  // var saltHex = ciphertext.salt.toString();     // random salt
  // var ctHex = ciphertext.ciphertext.toString(); // actual ciphertext
  // var ivHex = ciphertext.iv.toString();         // generated IV
  // console.log("salt："+saltHex)
  // console.log("hex："+ctHex)
  // console.log("ivHex："+ivHex)
  // let ciphertext2 = CryptoJS.AES.encrypt(password, CryptoJS.enc.Base64.parse('jiahanglee'), {
  //   mode: CryptoJS.mode.ECB,
  //   padding: CryptoJS.pad.Pkcs7
  // }).toString();
  // console.log("2:"+ciphertext2)
  // Decrypt
  // var bytes  = CryptoJS.AES.decrypt(ciphertext, 'jiahangLee');
  // var originalText = bytes.toString(CryptoJS.enc.Utf8);

  return request(`http://${api.service_url}/babyship/login?username=${username}&password=${CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(ciphertext))}&remember=${remember}`,{
    method: 'POST',
    body: JSON.stringify("ok"),
    // credentials: 'include',
    // mode:"cros"
})
}
