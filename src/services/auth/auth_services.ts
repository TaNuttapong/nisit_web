import InstanceHttps from "../../clients";
import { LoginRequest } from "../../models/request/auth/LoginRequestModel";
import { addRequest } from "../../models/request/auth/addRequestModel";
import { ApiResponse } from "../../models/responses/ApiResponse";
import LoginResponse from "../../models/responses/LoginResponseModel";
import addResponse from "../../models/responses/addResponseModel";

const AuthService = {
  async addService(payload: addRequest) {
    return InstanceHttps({}).post<ApiResponse<addResponse>>(
      "/apis/account/add",
      payload
    );
  },
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
