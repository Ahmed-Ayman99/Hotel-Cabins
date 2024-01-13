import axios from "axios";

import { BE_URL } from "../utils/constants";

export const getCabins = async (token) => {
  try {
    const res = await axios({
      url: `${BE_URL}/cabins`,
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return res.data.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

export const deleteCabinApi = async (cabinId, token) => {
  try {
    const res = await axios({
      url: `${BE_URL}/cabins/${cabinId}`,
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

export const createCabinApi = async (token, data, id) => {
  try {
    let res;
    if (id)
      res = await axios({
        method: "PATCH",
        url: `${BE_URL}/cabins/${id}`,
        data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

    if (!id) {
      res = await axios({
        method: "POST",
        url: `${BE_URL}/cabins`,
        data,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    }

    return res.data.data;
  } catch (err) {
    throw new Error(err);
  }
};
