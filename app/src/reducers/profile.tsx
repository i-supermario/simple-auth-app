import { createSlice } from "@reduxjs/toolkit";
import { fetchLogin } from "../thunks/fetchlogin"
import { fetchRegister } from "../thunks/fetchregister"
import { registerResponse } from "../types/response";
import { RootState } from "../store";
import { UserI } from "../types/common";

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




const profileSlice = createSlice({
    name: "register",
    initialState,
    reducers: {  
            update(state, payload : { payload: UserI } ){
                if(state.data){
                    // state.data.user.__v = payload.payload.__v
                    state.data.user.name = payload.payload.name
                    // state.data.user.email = payload.payload.email
                    state.data.user.password = payload.payload.password
                    state.data.user.bio = payload.payload.bio
                    // state.data.user._id = payload.payload._id
                    state.data.user.mobile = payload.payload.mobile
                }
            }
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

export const profileReducer = profileSlice.reducer

export const { update } = profileSlice.actions

export const selectStatus = (state: RootState) => state.profile.status

export const selectData = (state: RootState) => state.profile.data;