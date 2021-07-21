// Helpers que nos ayuda a mandar el token al backend
//const BASE_URL = process.env.REACT_APP_API_URL;
const BASE_URL = "http://localhost:4000/api";

export const fetchWithOutToken = (endpoint, data = {}, method = "GET") => {
  // Esta funcion no lleva token
  const URL = `${BASE_URL}/${endpoint}`;

  if (method === "GET") {
    // Devuelve la funcion fetch
    return fetch(URL);
  } else {
    return fetch(URL, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  }
};

export const fetchWithToken = (endpoint, data = {}, method = "GET") => {
  // Esta funcion lleva headers personalizados
  const URL = `${BASE_URL}/${endpoint}`;
  const token = localStorage.getItem("token") || "no-token";

  if (method === "GET") {
    // Devuelve la funcion fetch
    return fetch(URL, {
      method,
      headers: {
        "Content-type": "application/json",
        "x-token": token,
      },
    });
  } else {
    return fetch(URL, {
      method,
      headers: {
        "Content-type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(data),
    });
  }
};
