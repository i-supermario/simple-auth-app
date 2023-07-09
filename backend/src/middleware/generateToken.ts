import jwt from "jsonwebtoken"


export default function generateToken(id: string, email: string): string {
    const token = jwt.sign(
        {
        userId : id,
        userEmail : email,
        },
        process.env.SECRET_KEY,
        {expiresIn: "12h"}
    )
    return token
}