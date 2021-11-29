/**
 * @description User-Service parameters
 */
export interface IUserOptions {
  uid: string;
  name?: string,
  role?: number,
}

export interface IGetUserResponse {
  success: boolean;
  message: string;
  data: IUserOptions | string;
}

export interface User {
  id: number;
  name: string;
  age: number;
}
