import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

interface OptionInstance {
  token?: boolean;
}

function InstanceHttps({ apiKey, token }: OptionInstance): AxiosInstance {
  const getToken = Cookies.get("token") ?? "";
  const headers: Record<string, string> = {
    "Content-type": "application/json",
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
