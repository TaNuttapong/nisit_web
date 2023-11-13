import InstanceHttps from "../clients";
import { AddNiSitRequest } from "../models/request/auth/nisitRequestModel";
import { ApiResponse } from "../models/responses/ApiResponse";
import { AddNisitExcelResponse } from "../models/responses/NisitExcelResponseModel copy";
import { AddNisitResponse } from "../models/responses/NisitResponseModel";

const NisitService = {
  async addNiSitExcelService(payload: any, project_id: string) {
    return InstanceHttps({ token: true, multipart: true }).post<
      ApiResponse<AddNisitExcelResponse>
    >(`/apis/nisit/excel/add?project_id=${project_id}`, payload);
  },
  async addNiSitService(payload: AddNiSitRequest, project_id: string) {
    return InstanceHttps({ token: true }).post<ApiResponse<AddNisitResponse>>(
      `/apis/nisit/add?project_id=${project_id}`,
      payload
    );
  },
};

export default NisitService;
