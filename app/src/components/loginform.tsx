import { Button, Input } from "@chakra-ui/react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { AppDispatch } from "../store"
import { fetchLogin } from "../thunks/fetchlogin"


export default function LoginForm(): JSX.Element{

    const navigate = useNavigate()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const dispatch = useDispatch<AppDispatch>()
    const handleClick = () => {
        dispatch(fetchLogin( { email: email, password: password }))
        navigate('/profile')
    }
    return(
        <>
            <Input placeholder="Email" size="md" value={email} onChange = {(e)=>{setEmail(e.target.value)}} />
            <Input placeholder="Password" size="md" value={password} onChange = {(e)=>{setPassword(e.target.value)} }/>
            <Button colorScheme="blue" onClick={()=>{
                handleClick();
                setEmail('')
                setPassword('')
            }}>Login</Button>
        </>
    )
}