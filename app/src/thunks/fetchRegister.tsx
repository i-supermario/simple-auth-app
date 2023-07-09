import { createAsyncThunk } from "@reduxjs/toolkit";
import { Credentials } from "../types/common";
import { registerResponse } from "../types/response";

type registerError = {
    message: string
}

export const fetchRegister = createAsyncThunk<registerResponse,Credentials,{ rejectValue: registerError }>(
    "register",async (credentials: Credentials, thunkAPI ) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        };
        const response = await fetch("http://localhost:8080/register",requestOptions)

        if(response.status !== 201){
            return thunkAPI.rejectWithValue({
                message: "Failed to register"
            })
        }

        const data: registerResponse = await response.json()
        localStorage.setItem("accessToken",data.token)
        return data
    }
)



