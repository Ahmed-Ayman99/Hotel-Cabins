import axios from "axios";

import { BE_URL } from "../utils/constants";

export const getSettings = async (token) => {
  const res = await axios({
    method: "GET",
    url: `${BE_URL}/setting`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};

export const editeSettingsApi = async (data, id, token) => {
  const res = await axios({
    method: "PATCH",
    url: `${BE_URL}/setting/${id}`,
    data,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};
