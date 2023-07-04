import { createSlice } from "@reduxjs/toolkit";
import { fetchLogin } from "../thunks/fetchlogin"
import { fetchRegister } from "../thunks/fetchregister"
import { registerResponse } from "../types/response";
import { RootState } from "../store";

export enum statusValues{
    Idle = 'idle',
    LoggedIn = 'loggedin',
    Pending = 'pending',
    Rejected = 'rejected',
    SignedUp = 'signedup'
}

interface registerState {
    data? : registerResponse | null,
    status: statusValues
}

const initialState : registerState = {
    data: null ,
    status: statusValues.Idle
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
            state.status = statusValues.Pending
        }) 
        .addCase(fetchRegister.fulfilled,(state,action)=>{
            console.log('signedup')
            state.data = action.payload
            state.status = statusValues.SignedUp
        })
        .addCase(fetchRegister.rejected,(state)=>{
            console.log('rejected')
            state.status = statusValues.Rejected
        })
        .addCase(fetchLogin.pending,(state)=>{
            console.log('pending')
            state.status = statusValues.Pending
        }) 
        .addCase(fetchLogin.fulfilled,(state,action)=>{
            console.log('loggedin')
            state.data = action.payload
            state.status = statusValues.LoggedIn
        })
        .addCase(fetchLogin.rejected,(state)=>{
            console.log('rejected')
            state.status = statusValues.Rejected
        })
    }
})

export const registerReducer = registerSlice.reducer

export const selectStatus = (state: RootState) => state.register.status;

export const selectData = (state: RootState) => state.register.data;