import InstanceHttps from "../clients";
import { AddProjectRequest } from "../models/request/auth/projectRequestModel";

import { ApiResponse } from "../models/responses/ApiResponse";
import {
  AddProjectResponse,
  getProjectResponse,
} from "../models/responses/ProjectResponseModel";

const ProjectService = {
  async addProjectService(payload: AddProjectRequest) {
    return InstanceHttps({ token: true }).post<ApiResponse<AddProjectResponse>>(
      "/apis/project/add",
      payload
    );
  },
  async listProjectService() {
    return InstanceHttps({ token: true }).get<
      ApiResponse<getProjectResponse[]>
    >("/apis/project/list");
  },
};

export default ProjectService;
