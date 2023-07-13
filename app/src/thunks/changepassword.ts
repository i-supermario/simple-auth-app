import { createAsyncThunk } from "@reduxjs/toolkit";

interface response{
    message: string
}

interface rejectMessage{
    message: string,
    e?: string
}

interface thunkArgs{
    email: string
    currentPassword: string
    newPassword: string
}

export const changePassword = createAsyncThunk<response,thunkArgs,{rejectValue: rejectMessage}>(
    "changepassword",async (args: thunkArgs,thunkAPI) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
            body: JSON.stringify({email: args.email , currentpassword: args.currentPassword, newpassword: args.newPassword})
        };
        const response = await fetch("http://localhost:8080/changepassword",requestOptions)

        if(response.status !== 200){
            return thunkAPI.rejectWithValue({
                message: "Failed to login"
            })
        }
        
        const data: response = await response.json()
        console.log(data.message)
        return thunkAPI.fulfillWithValue({
            message: data.message
        })
    }
)