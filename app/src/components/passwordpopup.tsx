import { Button, Input, Popover, PopoverContent, PopoverTrigger, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { selectData } from "../slices/profile";
import { changePassword } from "../thunks/changepassword";
import { passwordChangeStatus, selectPasswordChangeStatus } from "../slices/password";

export default function PasswordChangePopup(){

    const [currentPassword,setCurrentPassword] = useState<string>("")
    const [newPassword,setNewPassword] = useState<string>("")
    const dispatch = useDispatch<AppDispatch>()
    const email = useSelector(selectData)?.user.email as string
    const toast = useToast()

    const passwordChange = useSelector(selectPasswordChangeStatus)

    const handlePasswordChangeToast = ()=>{
        console.log(passwordChange)
        if(passwordChange===passwordChangeStatus.success){
            toast({
                position:"bottom-left",
                title: 'Password Change Successful',
                status: 'success',
                duration: 3000,
                isClosable: true,
              })
        }
        else if(passwordChange===passwordChangeStatus.reject){
            toast({
                position:"bottom-left",
                title: 'Password Change Failed',
                status: "error",
                duration: 3000,
                isClosable: true,
              })
        }
    }



    return(
        <>
            <Popover isLazy>
                <PopoverTrigger>
                    <Button width={"40%"} colorScheme="red" size="sm">Change password</Button>
                </PopoverTrigger>
                <PopoverContent padding={"20px"} rowGap={"10px"}>
                    <Input placeholder="Enter current password" type="password" value={currentPassword} onChange={(e)=>{setCurrentPassword(e.target.value)}}/>
                    <Input placeholder="Enter new password" type="password" value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}}/>
                    <Button isDisabled={currentPassword==="" || newPassword===""} colorScheme="whatsapp" onClick={()=>{

                        dispatch(changePassword({email: email,currentPassword: currentPassword,newPassword: newPassword}))
                        setNewPassword("")
                        setCurrentPassword("")
                        setTimeout(handlePasswordChangeToast,3000)
                    }}>Change</Button>
                </PopoverContent>
            </Popover>
        </>
    )
}