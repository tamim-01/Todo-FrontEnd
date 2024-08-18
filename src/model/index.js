import config from "../config/index.js";

//sets jwt from back-end to local storage
export async function signinApi(data) {
  try {
    const response = await fetch(`${config.apiBaseUrl}/api/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataFromApi = await response.json();

    if (response.ok) {
      localStorage.setItem("token", dataFromApi.jwt);
      console.log("sign in success");
    } else {
      return dataFromApi.message;
    }
  } catch (error) {
    console.log("Error:", error);
  }
}
//creates user
export async function signupApi(data) {
  try {
    const response = await fetch(`${config.apiBaseUrl}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataFromApi = await response.json();

    if (response.ok) {
      console.log("sign up success");
    } else {
      return dataFromApi.message;
    }
  } catch (error) {
    console.log("Error:", error);
  }
}
