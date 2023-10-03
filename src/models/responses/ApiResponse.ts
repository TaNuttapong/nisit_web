import { StatusModel } from "../statusModel";

export interface ApiResponse<T> {
  status: StatusModel;
  data: T;
  error?: string;
}
