import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchLogin } from "../thunks/fetchlogin"
import { fetchRegister } from "../thunks/fetchregister"
import { registerResponse, updateResponse } from "../types/response";
import { RootState } from "../store";
import { updateUser } from "../thunks/updateuser";

export enum statusValues{
    Idle = 'idle',
    Success = 'success',
    Pending = 'pending',
    Rejected = 'rejected',
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
            resetState(state){
                state.data = null
                state.status = statusValues.Idle
            }
        }
        ,
    extraReducers : (builders) => {
        builders
        .addCase(updateUser.fulfilled,(state,action: {payload: updateResponse})=>{
            if(state.data){
                if(action.payload.user.bio){
                    state.data.user.bio = action.payload.user.bio
                }
                if(action.payload.user.name){
                    state.data.user.name = action.payload.user.name
                }
                if(action.payload.user.password){
                    state.data.user.password = action.payload.user.password
                }
                if(action.payload.user.mobile){
                    state.data.user.mobile = action.payload.user.mobile
                }
            }
        })
        .addMatcher(isAnyOf(fetchRegister.pending,fetchLogin.pending),(state) => {
            state.status = statusValues.Pending
        })
        .addMatcher(isAnyOf(fetchRegister.rejected,fetchLogin.rejected),(state) => {
            state.status = statusValues.Rejected
        })
        .addMatcher(isAnyOf(fetchRegister.fulfilled,fetchLogin.fulfilled),(state,action)=>{
            state.data = action.payload
            state.status = statusValues.Success
        })
    }
})

export const profileReducer = profileSlice.reducer

export const { resetState } = profileSlice.actions

export const selectStatus = (state: RootState) => state.profile.status 

export const selectData = (state: RootState) => state.profile.data;