import axios from 'axios';


const API_KEY = "";
const ACCESS_TOKEN = "9UDAGNAEhhhQvgh0g0POqQ";
const BEARER_TOKEN = "eyJhY2Nlc3MtdG9rZW4iOiI5VURBR05BRWhoaFF2Z2gwZzBQT3FRIiwidG9rZW4tdHlwZSI6IkJlYXJlciIsImNsaWVudCI6InUycTdmVUVYNTdlWE5FQy10dkFSMnciLCJleHBpcnkiOiIxNjkwNzcwNzA5IiwidWlkIjoiYTNAYS5jb20ifQ";
const TOKEN_TYPE = "Bearer";
// Expiry : 1690770709
// Uid : email
const URL = "https://a032-103-182-81-19.ngrok-free.app/"

async function authenticate({email, password}) {
  const url = `${URL}auth/sign_in`;
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Authorization': `Bearer ${ACCESS_TOKEN}`,
    "token-type": `Bearer`,
    "access-token": ACCESS_TOKEN,
    "expiry": 1690770709,
    "uid": email,
//    'Host': 'exp://192.168.1.18:8081',
  };
  const data = {
    'email': email,
    'password': password,
//    'confirm_success_url': "exp://192.168.1.18:8081",
  };
  const response = await axios.post(url, data, headers).then((response) => {
    console.log("response", response);
    console.log("expiry", response.data.headers.expiry);
    console.log("token-type", response.data.headers['token-type']);
    console.log("uid", response.data.headers.uid);
    console.log("authorization", response.data.headers.authorization);
    console.log("access-token", response.data.headers['access-token']);
    console.log("client", response.data.headers.client);
    return response.data;
  }).catch((error) => {
    console.log(error);
    return error;
  });
  return response;
}



export async function createUser({email, password, confirmPassword}) {

  const url = `${URL}auth`
//  const url = `.../create_user?api_key=${API_KEY}`;
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
//    'Host': 'exp://192.168.1.18:8081',
  };

  console.log("email", email, password, confirmPassword);
  const data = {
    'email': email,
    'password': password,
    'password_confirmation': confirmPassword,
    'confirm_success_url': "exp://192.168.1.18:8081",
  };

  const response = await axios.post(url, data, headers).then((response) => {
    console.log("response", response);
    console.log(response.headers.expiry);
    console.log("token-type", response.headers['token-type']);
    console.log("uid", response.headers.uid);
    console.log("authorization", response.headers.authorization);
    console.log("access-token", response.headers['access-token']);
    return response.data;
  })
    .catch((error) => {
    console.log(error);
  });

  return response;
};

export async function login({email, password}) {
  await authenticate({email, password});
};

// a4@a.com
