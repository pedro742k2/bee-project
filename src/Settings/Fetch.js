import ServerApi from "./ServerApi";

const Fetch = (route, method, body) => {
  console.log(ServerApi);

  const token = localStorage.getItem("authorization_token");

  const promise = new Promise((resolve, reject) => {
    fetch(ServerApi + route, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(body),
    })
      .then((response) => resolve(response.json()))
      .catch((error) => reject(error));
  });

  return promise;
};

export default Fetch;
