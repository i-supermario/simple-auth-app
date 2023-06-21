import { Button, Input } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { Navigate, redirect, useNavigate } from "react-router";

function SignUpForm() : JSX.Element {

    const navigate = useNavigate()
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState('')


    function handleClick(e: FormEvent){
        console.log("inside")
        // e.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: email, password: password})
        };
        fetch("http://localhost:8080/register",requestOptions)
        .then((res)=>{
            console.log(res.status)
        })
    }

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