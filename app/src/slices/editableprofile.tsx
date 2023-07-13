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
        setEditable(state,payload){
            state.editable = payload.payload
        }
    }
})

export const { setEditable } = editableProfile.actions

export const editableProfileReducer = editableProfile.reducer

export const selectProfileEditableStatus = (state: RootState) => state.persistedReducer.profileEditable.editable