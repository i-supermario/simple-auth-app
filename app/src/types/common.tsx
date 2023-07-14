export interface Credentials{
    email: string,
    password: string
}

export interface UserI extends Credentials{
    name?: string,
    bio?: string,
    mobile?: string,
    imageurl?: string
    _id: string,
    __v: number
}

