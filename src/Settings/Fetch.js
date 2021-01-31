import ServerApi from "./ServerApi";

const Fetch = (route, method, body) => {
  const promise = new Promise((resolve, reject) => {
    fetch(ServerApi + route, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((response) => resolve(response.json()))
      .catch((error) => reject(error));
  });

  return promise;
};

export default Fetch;
