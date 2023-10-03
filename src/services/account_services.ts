const AuthService = {
  async loginService(payload: LoginRequest) {
    return InstanceHttps({}).post<ApiResponse<LoginResponse>>(
      "/apis/auth/login",
      payload
    );
  },
};

export default AuthService;
