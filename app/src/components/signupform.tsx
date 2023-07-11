import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { fetchRegister } from "../thunks/fetchregister";
import { AppDispatch } from "../store";

function SignUpForm() : JSX.Element {

    const navigate = useNavigate()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const dispatch = useDispatch<AppDispatch>()
    const handleClick = () => {
        dispatch(fetchRegister( { email: email, password: password }))
        navigate('/profile')
    }

    return (
        <>
            <Input placeholder="Email" size="md" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <Input placeholder="Password" size="md" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <Button isDisabled = {email === "" || password === ""} type="submit" colorScheme="blue" onClick={(e)=>{
                handleClick()
                setEmail('')
                setPassword('')
            }} >Start coding now</Button>
        </>
    )
}

export default SignUpForm;