export interface IRegsiterRequest {
  uid: string;
  name?: string;
  authProvider: string;
  email?: string;
}

export interface ILoginRequest {
  token: string;
}

export interface ILoginResponse {
  accessToken: string;
}

export interface ILoginKakaoRequest extends ILoginRequest {}
