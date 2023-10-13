import { UpdateAccountRequest } from "./../models/request/auth/addRequestModel";
import InstanceHttps from "../clients";
import { AddAccountRequest } from "../models/request/auth/addRequestModel";
import {
  addAccountResponse,
  getAccountResponse,
} from "../models/responses/AccountResponseModel";
import { ApiResponse } from "../models/responses/ApiResponse";

const AccountService = {
  async addService(payload: AddAccountRequest) {
    return InstanceHttps({ token: true }).post<ApiResponse<addAccountResponse>>(
      "/apis/account/add",
      payload
    );
  },
  async listService() {
    return InstanceHttps({ token: true }).get<
      ApiResponse<getAccountResponse[]>
    >("/apis/account/list");
  },
  async updateAccountService(id: string, payload: UpdateAccountRequest) {
    return InstanceHttps({ token: true }).post<ApiResponse<string>>(
      `/apis/account/update/${id}`,
      payload
    );
  },
  async deleteService(id: string) {
    return InstanceHttps({ token: true }).delete<ApiResponse<boolean>>(
      `/apis/account/delete/${id}`
    );
  },
};

export default AccountService;
