export interface Credentials{
    email: string,
    password: string
}

export interface UserI{
    _id: string,
    name: string,
    bio?: string,
    phone?: string
}

export interface ProfileI extends UserI,Credentials {
    
}