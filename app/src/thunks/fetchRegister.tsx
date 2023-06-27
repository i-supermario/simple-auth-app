import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Credentials } from "../types/common";
import { registerResponse } from "../types/response";
import { RootState } from "../store";

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
            console.log('rejected')
            return thunkAPI.rejectWithValue({
                message: "Failed to register"
            })
        }
        console.log('fulfilled')

        const data: registerResponse = await response.json()
        return data
    }
)

interface registerState {
    data? : registerResponse | null,
    status: 'idle' | 'pending' | 'succeeded' | 'rejected'
}

const initialState : registerState = {
    data: null ,
    status: 'idle'
}


const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {  
        
        }
        ,
    extraReducers : (builders) => {
        builders
        .addCase(fetchRegister.pending,(state)=>{
            console.log('pending')
            state.status = 'pending'
        }) 
        .addCase(fetchRegister.fulfilled,(state,action)=>{
            console.log('fulfilled')
            state.data = action.payload
            state.status = 'succeeded'
        })
        .addCase(fetchRegister.rejected,(state)=>{
            console.log('rejected')
            state.status = 'rejected'
        })
    }
})

export default registerSlice.reducer

export const selectStatus = (state: RootState) => state.register.status;

export const selectData = (state: RootState) => state.register.data;

