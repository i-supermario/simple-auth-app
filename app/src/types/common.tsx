export interface Credentials{
    email: string | undefined,
    password: string | undefined
}

export interface UserI extends Credentials{
    name?: string,
    bio?: string,
    mobile?: string,
    _id: string | undefined,
    __v: number | undefined
}