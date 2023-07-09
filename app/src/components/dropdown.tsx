import { Button, Image, Menu, MenuButton, MenuItem, MenuList, StatDownArrow } from "@chakra-ui/react"
import ProfilePic from "../media/logo192.png"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store"
import { resetState } from "../slices/profile"
import { useNavigate } from "react-router"




export default function DropDown(){

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    return(
        <>
            <Menu>
                <MenuButton as={Button} rightIcon={<StatDownArrow color="black"/>} leftIcon={<Image boxSize="20px" src={ProfilePic}/>}>
                    Name bata de
                </MenuButton>
                <MenuList>
                    <MenuItem as="button">My Profile</MenuItem>
                    <MenuItem as="button">Group Chat</MenuItem>
                    <MenuItem as="button" color="red" onClick={()=>{
                                dispatch(resetState())
                                navigate("/login")
                            }}>Logout</MenuItem>
                </MenuList>
            </Menu>
        </>
    )
}