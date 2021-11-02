import axios from "axios";
import { API } from "./baseurl";
import firebase from "@react-native-firebase/app";
import messaging from "@react-native-firebase/messaging";

// Create axios client, pre-configured with baseURL

const axiosTiming = (instance) => {
  instance.interceptors.request.use((request) => {
    request.ts = Date.now();
    // console.log("request send", request);
    return request;
  });

  instance.interceptors.response.use((response) => {
    const timeInMs = `${Number(Date.now() - response.config.ts).toFixed()}ms`;
    response.latency = timeInMs;
    // console.log("response recived", response);

    return response;
  });
};
axiosTiming(axios);

export const register = async (data) => {
  return axios(API.REGISTRATION_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const login = async (data) => {
  return axios(API.LOGIN_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    data,
  })
    .then((response) => {
      console.log("Response latency: ", response.latency);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
export const forgotpassword = async (data) => {
  // console.log(data);
  return axios(API.FORGOT_PASSWORD, {
    method: "POST",
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const resetpassword = async (data) => {
  return axios(API.RESET_PASSWORD, {
    method: "POST",
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const registerStoreImage = async (data, access_token) => {
  return axios(API.STORE_IMAGE_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const userprofile = async (data, access_token) => {
  return axios(API.GET_USER_DATA, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const userprofileupdate = async (data, access_token) => {
  return axios(API.UPDTAE_USER_DETAIL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const gethouseplant = async (data, access_token) => {
  return axios(API.GET_HOUSE_PLANT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const getquizmaster = async (data, access_token) => {
  return axios(API.GET_QUIZ_MASTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const userquizmasterdata = async (data, access_token) => {
  return axios(API.USER_QUIZ_MASTER_DATA, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token,
    },
    data,
  })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
export const requestUserPermission = async () => {
  let authStatus = await firebase.messaging().hasPermission();
  if (
    authStatus !== firebase.messaging.AuthorizationStatus.AUTHORIZED ||
    messaging.AuthorizationStatus.PROVISIONAL
  ) {
    authStatus = await firebase.messaging().requestPermission();
  }
  if (authStatus === firebase.messaging.AuthorizationStatus.AUTHORIZED) {
    return authStatus;
  }
};

export const getFcmToken = async () => {
  const fcmToken = await messaging().getToken();
  console.log("hiiii", fcmToken);
  return fcmToken;
};
