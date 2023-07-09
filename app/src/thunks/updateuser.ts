import { createAsyncThunk } from "@reduxjs/toolkit";
import { editableResponse, updateResponse } from "../types/response";


type updateError = {
    message: string
}

export const updateUser = createAsyncThunk<updateResponse,editableResponse,{ rejectValue: updateError }>(
    "update",async (updatedUser: editableResponse, thunkAPI ) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem("accessToken")}`, },
            body: JSON.stringify({email: updatedUser.email, name: updatedUser.name,bio: updatedUser.bio, password: updatedUser.password, mobile: updatedUser.mobile })
        };
        const response = await fetch("http://localhost:8080/update",requestOptions)


        if(response.status === 400){
            return thunkAPI.rejectWithValue({
                message: "Failed to update"
            })
        }

        const data: updateResponse = {
            message: await response.json(),
            user: updatedUser
        }

        console.log(data.message)

        
        return thunkAPI.fulfillWithValue(data)
    }
)