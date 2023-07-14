import { Button, Image, Menu, MenuButton, MenuItem, MenuList, StatDownArrow } from "@chakra-ui/react"
import ProfilePic from "../media/logo192.png"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "../store"
import { resetState, selectData } from "../slices/profile"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"




export default function DropDown(){

    const user = useSelector(selectData)?.user

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    return(
        <>
            <Menu>
                <MenuButton as={Button} rightIcon={<StatDownArrow color="black"/>} leftIcon={<Image boxSize="20px" src={user?.imageurl}/>}>
                    {
                        user?.name ? user.name : "pehchan kaun?"
                    }
                </MenuButton>
                <MenuList>
                    <MenuItem as="button"><Link to={"/profile"}>My Profile</Link></MenuItem>
                    <MenuItem as="button" color="red" onClick={()=>{
                                dispatch(resetState())
                                navigate("/login")
                            }}>Logout</MenuItem>
                </MenuList>
            </Menu>
        </>
    )
}