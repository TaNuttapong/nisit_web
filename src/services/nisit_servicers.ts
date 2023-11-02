import InstanceHttps from "../clients";
import { AddNiSitRequest } from "../models/request/auth/nisitRequestModel";
import { ApiResponse } from "../models/responses/ApiResponse";
import { AddNisitExcelResponse } from "../models/responses/NisitExcelResponseModel copy";
import { AddNisitResponse } from "../models/responses/NisitResponseModel";

const NisitService = {
  async addNiSitExcelService(payload: any) {
    return InstanceHttps({ token: true, multipart: true }).post<
      ApiResponse<AddNisitExcelResponse>
    >("/apis/nisit/excel/add", payload);
  },
  async addNiSitService(payload: AddNiSitRequest) {
    return InstanceHttps({ token: true }).post<ApiResponse<AddNisitResponse>>(
      "/apis/nisit/add",
      payload
    );
  },
};

export default NisitService;
