import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

interface OptionInstance {
  token?: boolean;
  multipart?: boolean;
}

function InstanceHttps({ token, multipart }: OptionInstance): AxiosInstance {
  const getToken = Cookies.get("token") ?? "";
  const headers: Record<string, string> = {
    "Content-type": multipart ? "multipart/form-data" : "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${getToken}`;
  }

  const Https = axios.create({
    baseURL: process.env.ENDPOINT_URL,
    headers,
  });

  return Https;
}

export default InstanceHttps;
