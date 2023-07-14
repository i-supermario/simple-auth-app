import { UserI } from "./common";

export interface registerResponse{
    message: string,
    token: string,
    user: UserI
}

export interface loginResponse extends registerResponse{}

export interface editableResponse{
    email: string,
    name?: string,
    password?: string,
    mobile?: string,
    bio?: string
    imageurl?: string
}

export interface updateResponse {
    message: string,
    user: editableResponse
}