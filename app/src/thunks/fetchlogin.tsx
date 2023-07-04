import { createAsyncThunk } from "@reduxjs/toolkit";
import { Credentials } from "../types/common";
import { loginResponse } from "../types/response";

type loginError = {
    message: string
}

export const fetchLogin = createAsyncThunk<loginResponse,Credentials,{ rejectValue: loginError }>(
    "login",async (credentials: Credentials, thunkAPI ) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        };
        const response = await fetch("http://localhost:8080/login",requestOptions)

        if(response.status === 400){
            console.log('rejected why?')
            return thunkAPI.rejectWithValue({
                message: "Failed to login"
            })
        }

        const data: loginResponse = await response.json()
        return data
    }
)