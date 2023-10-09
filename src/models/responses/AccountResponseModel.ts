export interface getAccountResponse {
  id: number;
  email: string;
  name: string;
  branch: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
export interface addAccountResponse {
  email: string;
  name: string;
  branch: string;
  password: string;
}
