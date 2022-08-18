const getAll = () => {
  return fetch(
    "http://localhost:8080/api/athletes", 
    {
      method: "GET"
    }
  )
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const getAthlete = (athleteId) => {
  let formData = new URLSearchParams();
  formData.append("tokenId", localStorage.getItem("uuid"));
  return fetch(
    "http://localhost:8080/api/athletes/" +
      athleteId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        // "tokenId": getUUID
      },
      body: formData,
    }
  )
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const getActivities = (athleteId) => {
  let formData = new URLSearchParams();
  formData.append("tokenId", localStorage.getItem("uuid"));
  return fetch(
    "http://localhost:8080/athleteapp/allactivities?id=" +
      athleteId,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        // "tokenId": getUUID
      },
      body: formData,
    }
  )
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const validator = (email, password) => {
  let formData = new URLSearchParams();
  formData.append("email", email);
  formData.append("password", password);
  // return fetch(
  //   "http://localhost:8080/login",
  //   {
  //     method: "POST",
  //     mode: "no-cors",
  //     headers: {
  //       // "Content-Type": "multipart/form-data",
  //       "Accept": "application/json, application/xml, text/plain, text/html, *.*"
  //       // "tokenId": getUUID
  //     },
  //     body: formData,
  //   }
  // )
  //   .then((response) => response.json())
  //   .catch((err) => console.log(err));
  return fetch("http://localhost:8080/login",
    {
      method: "POST",
      mode: "no-cors",
      headers: {
        // "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        // "tokenId": getUUID
        // "Accept": "application/json, application/xml, text/plain, text/html, *.*"
      },
      body: formData,
    }
  )
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const continueLogin = (tokenId) => {
  let formData = new URLSearchParams();
  formData.append("tokenId", tokenId);
  return fetch(
    "http://localhost:8080/athleteapp/continuelogin",
    {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>;charset=UTF-8",
      },
      body: formData,
    }
  )
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const LogoutClearUUID = (uuid) => {
  // let formData = new URLSearchParams();
  // formData.append("tokenId", uuid);
  return fetch(
    "http://localhost:8080/athleteapp/logout",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        tokenId: uuid,
      },
      // body: formData,
    }
  )
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

const getUUID = localStorage.getItem("uuid");

const setUUID = (uuid) => {
  if (getUUID === null) {
    localStorage.setItem("uuid", uuid);
  }
};

const Service = {
  getAll,
  getAthlete,
  getActivities,
  validator,
  setUUID,
  continueLogin,
  LogoutClearUUID,
  // remove
};

export default Service;
