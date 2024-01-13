import axios from "axios";
import { BE_URL } from "../utils/constants";

export const getLogin = async ({ email, password }) => {
  const url = `${BE_URL}/user/login`;

  try {
    const res = await axios({
      url,
      method: "POST",
      data: { email, password },
      credentials: "include",
    });

    const data = res.data;
    localStorage.setItem("wild_oasis_user", JSON.stringify(data));

    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

export const getSignUp = async (userData) => {
  const url = `${BE_URL}/api/user/register`;

  try {
    const res = await axios({
      url,
      method: "POST",
      data: userData,
    });

    const data = res.data;
    localStorage.setItem("wild_oasis_user", JSON.stringify(data));

    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

export const getLogout = async () => {
  const url = `${BE_URL}/user/logout`;

  try {
    const res = await axios({
      url,
      method: "GET",
    });

    const data = res.data;

    return data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

export const getUser = async (token) => {
  if (!token) return null;
  const url = `${BE_URL}/user/me`;

  try {
    const res = await axios({
      url,
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "GET",
    });

    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};
