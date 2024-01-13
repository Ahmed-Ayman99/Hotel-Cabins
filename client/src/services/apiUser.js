import axios from "axios";

import { BE_URL } from "../utils/constants";

export const updateDataUser = async (data, token) => {
  const url = `${BE_URL}/user/updateMe`;

  try {
    const res = await axios({
      url,
      method: "PATCH",
      data,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return res.data.user;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

export const updatePassword = async (data, token) => {
  const url = `${BE_URL}/user/updatePassword`;

  try {
    const res = await axios({
      url,
      data,
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    localStorage.setItem("wild_oasis_user", JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};
