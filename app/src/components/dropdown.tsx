import { Button, Image, Menu, MenuButton, MenuItem, MenuList, StatDownArrow } from "@chakra-ui/react"
import ProfilePic from "../media/logo192.png"


export default function DropDown(){
    return(
        <>
            <Menu>
                <MenuButton as={Button} rightIcon={<StatDownArrow color="black"/>} leftIcon={<Image boxSize="20px" src={ProfilePic}/>}>
                    Name bata de
                </MenuButton>
                <MenuList>
                    <MenuItem as="button">My Profile</MenuItem>
                    <MenuItem as="button">Group Chat</MenuItem>
                    <MenuItem as="button" color="red">Logout</MenuItem>
                </MenuList>
            </Menu>
        </>
    )
}