import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface profileEditState{
    editable: boolean
}

const initialState: profileEditState = {
    editable : false
}

const editableProfile = createSlice({
    name : "editable",
    initialState,
    reducers: {
        editable(state){
            state.editable = true
        },
        notEditable(state){
            console.log("changing")
            state.editable = false
        }
    }
})

export const { editable, notEditable } = editableProfile.actions

export const editableProfileReducer = editableProfile.reducer

export const selectProfileEditableStatus = (state: RootState) => state.profileEditable.editable