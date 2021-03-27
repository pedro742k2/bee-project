import ServerApi from "./ServerApi";

const Fetch = (route, method, body) => {
  const token =
    JSON.parse(localStorage.getItem("token"))?.token ||
    JSON.parse(sessionStorage.getItem("token"))?.token;

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
