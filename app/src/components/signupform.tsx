import { Button, Input } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { fetchRegister } from "../thunks/fetchRegister";
import { ThunkDispatch } from "redux-thunk";

function SignUpForm() : JSX.Element {

    const navigate = useNavigate()

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const dispatch = useDispatch<ThunkDispatch<any,any,any>>()



    const handleClick = () => dispatch(fetchRegister( { email: email, password: password }))

    return (
        <>
            <Input placeholder="Email" size="md" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            <Input placeholder="Password" size="md" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            <Button type="submit" colorScheme="blue" onClick={(e)=>{
                handleClick(e)
                setEmail('')
                setPassword('')
            }} >Start coding now</Button>
        </>
    )
}

export default SignUpForm;