import axios from "axios";

import { BE_URL } from "../utils/constants";

export const getBookings = async (filter, sortBy, page, token) => {
  const params = new URLSearchParams();

  if (filter) params.append(filter.field, filter.value);
  if (page) params.append("page", page);
  if (sortBy) params.append("sort", sortBy);

  const url = `${BE_URL}/booking?${params}`;

  try {
    const res = await axios({
      url,
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

export const getBooking = async (id, token) => {
  const url = `${BE_URL}/booking/${id}`;

  try {
    const res = await axios({
      url,
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

export const checkinBooking = async (id, data, token) => {
  const url = `${BE_URL}/booking/${id}`;

  try {
    const res = await axios({
      url,
      method: "PATCH",
      data,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.data.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

export const deleteBookingApi = async (id, token) => {
  const url = `${BE_URL}/booking/${id}`;

  try {
    await axios({
      url,
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return null;
  } catch (err) {
    throw new Error(err.response?.data?.message || err.message);
  }
};

export const getRecentBookings = async (days, token) => {
  try {
    const url = `${BE_URL}/booking/bookingsAfterDate?days=${days}`;
    const res = await axios({
      url,
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

export const getRecentStays = async (days, token) => {
  try {
    const url = `${BE_URL}/booking/staysAfterDate?days=${days}`;

    const res = await axios({
      url,
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

export const getActivities = async (days, token) => {
  try {
    const url = `${BE_URL}/booking/getActivities?days=${days}`;

    const res = await axios({
      url,
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
