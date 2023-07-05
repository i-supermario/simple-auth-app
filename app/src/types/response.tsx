import { UserI } from "./common";

export interface registerResponse{
    message: string,
    token?: string,
    user: UserI
}

export interface loginResponse extends registerResponse{}