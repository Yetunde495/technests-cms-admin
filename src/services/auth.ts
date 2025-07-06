import axios from "axios";

export const signInUser = async (data: any) => {
  const response: any = await axios
    .post(`/auth/login`, data)
    .catch((e) => ({ error: e }));
  //check error
  if (response && response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.message || err?.statusText;
    throw new Error(msg);
  }
  return response?.data;
};

export const getAccountInfo = async () => {
  const response: any = await axios
    .get(`/user/`)
    .catch((e) => ({ error: e }));
  //check error
  if (response && response?.error) {
    const err = response?.error?.response;
    const msg = err?.data?.message || err?.statusText;
    throw new Error(msg);
  }

  return response?.data;
};