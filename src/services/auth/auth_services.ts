import InstanceHttps from "../../clients";
import { LoginRequest } from "../../models/request/auth/LoginRequestModel";
import { ApiResponse } from "../../models/responses/ApiResponse";
import LoginResponse from "../../models/responses/LoginResponseModel";

const AuthService = {
  async loginService(payload: LoginRequest) {
    return InstanceHttps({}).post<ApiResponse<LoginResponse>>(
      "/apis/auth/login",
      payload
    );
  },
  async logoutService() {
    return InstanceHttps({ token: true }).get<ApiResponse<boolean>>(
      "/apis/auth/logout"
    );
  },
};

export default AuthService;
