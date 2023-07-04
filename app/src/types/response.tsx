
export interface registerResponse{
    message: string,
    token?: string,
    result: {
        email: string,
        password: string,
        _id: string,
        __v: number
    }
}

export interface loginResponse extends registerResponse{}