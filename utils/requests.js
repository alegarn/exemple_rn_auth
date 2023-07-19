import axios from "axios";

const URL = "https://75dd-103-182-81-23.ngrok-free.app/";

export async function getExpenses({
  token,
  uid,
  userId,
  expiry,
  access_token,
  client,
}) {
  /* , uid, user_id */
  const url = `${URL}api/v1/expenses`;

  /* "access-token": "wwwww",
"token-type":   "Bearer",
"client":       "xxxxx",
"expiry":       "yyyyy",
"uid":          "zzzzz" */

  /* https://blog.logrocket.com/using-axios-set-request-headers/ */

  const headers = {
    Authorization: token,
    HTTP_AUTHORIZATION: token,
    "access-token": access_token,
    client: client,
    expiry: expiry,
    uid: uid,
    "token-type": "Bearer",
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "*/*",
  };

  const config = {
    headers: headers,
  };

  console.log("getExpenses", headers);

  const response = await axios
    .get(url, config)
    .then((response) => {
      console.log("get", response);
      return response;
    })
    .catch((error) => {
      console.log("error", error);
      return error;
    });
  console.log("response getExpenses", response);
  return response;
}
