import { createSlice } from "@reduxjs/toolkit";
import { changePassword } from "../thunks/changepassword";
import { RootState } from "../store";

export enum passwordChangeStatus{
    idle = "idle",
    reject = "reject" ,
    pending = "pending",
    success = "success"
}

interface initState{
    change: passwordChangeStatus
}

const initialState : initState = {
    change : passwordChangeStatus.idle
}

const passwordSlice = createSlice({
    name: "password",
    initialState,
    reducers: {},
    extraReducers:(builders) => {
        builders
        .addCase(changePassword.fulfilled,(state) => {
            console.log("fulfilled")
            state.change = passwordChangeStatus.success
        })
        .addCase(changePassword.rejected,(state)=>{
            console.log("rejected")
            state.change = passwordChangeStatus.reject
        })
        .addCase(changePassword.pending,(state)=>{
            console.log("pending")
            state.change = passwordChangeStatus.pending
        })
    }
})
    
export const passwordReducer = passwordSlice.reducer

export const selectPasswordChangeStatus = (state: RootState) => state.passwordReducer.change