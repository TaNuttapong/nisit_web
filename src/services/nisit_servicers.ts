import InstanceHttps from "../clients";
import { AddNiSitExcelRequest } from "../models/request/auth/nisitRequestModel";
import { ApiResponse } from "../models/responses/ApiResponse";
import { AddProjectResponse } from "../models/responses/ProjectResponseModel";

const NisitService = {
  async addNiSitExcelService(payload: AddNiSitExcelRequest) {
    return InstanceHttps({ token: true }).post<ApiResponse<AddProjectResponse>>(
      "/apis/nisit/excel/add",
      payload
    );
  },
};

export default NisitService;
