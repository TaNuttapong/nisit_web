import InstanceHttps from "../clients";
import { addRequest } from "../models/request/auth/addRequestModel";
import {
  addAccountResponse,
  getAccountResponse,
} from "../models/responses/AccountResponseModel";
import { ApiResponse } from "../models/responses/ApiResponse";

const AccountService = {
  async addService(payload: addRequest) {
    return InstanceHttps({ token: true }).post<ApiResponse<addAccountResponse>>(
      "/apis/account/add",
      payload
    );
  },
  async listService() {
    return InstanceHttps({ token: true }).get<ApiResponse<getAccountResponse>>(
      "/apis/account/list"
    );
  },
};

export default AccountService;
