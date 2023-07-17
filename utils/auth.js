import axios from 'axios';


const API_KEY = "";
const ACCESS_TOKEN = "9UDAGNAEhhhQvgh0g0POqQ";
const BEARER_TOKEN = "eyJhY2Nlc3MtdG9rZW4iOiI5VURBR05BRWhoaFF2Z2gwZzBQT3FRIiwidG9rZW4tdHlwZSI6IkJlYXJlciIsImNsaWVudCI6InUycTdmVUVYNTdlWE5FQy10dkFSMnciLCJleHBpcnkiOiIxNjkwNzcwNzA5IiwidWlkIjoiYTNAYS5jb20ifQ";
const TOKEN_TYPE = "Bearer";
// Expiry : 1690770709
// Uid : email
export async function createUser({email, password, confirmPassword}) {

  const url = "https://a032-103-182-81-19.ngrok-free.app/auth"
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
    return response.data;
  })
    .catch((error) => {
    console.log(error);
  });

  return response;
}

// a4@a.com
