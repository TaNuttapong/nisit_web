import jwtDecode from "jwt-decode";
import { DecodeJwt } from "../models/jwt/decode";

function decodeToken(token: string) {
  const decode_Token = jwtDecode<DecodeJwt>(token);
  return decode_Token;
}
export default decodeToken;
