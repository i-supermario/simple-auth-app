import { Alert, AlertIcon, AlertTitle, Box, Button, Card, CardBody, CardHeader, Container, Divider, Flex, Heading, Image, Input, Spinner, Stack, StackDivider, Text } from "@chakra-ui/react";
import Header from "../layout/header";
import ProfilePic from "../media/logo192.png"
import { useDispatch, useSelector } from "react-redux";
import { selectData, selectStatus, statusValues } from "../slices/profile";
import { setEditable, selectProfileEditableStatus } from "../slices/editableprofile";
import { AppDispatch } from "../store";
import { useEffect, useState } from "react";
import { editableResponse } from "../types/response";
import { updateUser } from "../thunks/updateuser";
import ProfileAttribute from "../components/profileattribute";
import Footer from "../layout/footer";






export default function Profile(){

    const status = useSelector(selectStatus)
    const data = useSelector(selectData)?.user as editableResponse
    const editableStatus = useSelector(selectProfileEditableStatus)
    const dispatch = useDispatch<AppDispatch>()
    const [profileName,setProfileName] = useState<string>()
    const [profileBio,setProfileBio] = useState<string>()
    const [profileMobile,setProfileMobile] = useState<string>()
    const [profilePassword,setProfilePassword] = useState<string>()

    useEffect(()=>{
        setProfileBio(data?.bio)
        setProfileMobile(data?.mobile)
        setProfileName(data?.name)
    },[data?.bio,data?.mobile,data?.name])

    if(status===statusValues.Success){
        return(
            <>
                {/* <Container display={"flex"} flexDirection={"column"} rowGap={"50px"} paddingY={"50px"} > */}
                    <Header/>
                    <Box width="auto" display="flex" flexDirection="column" rowGap="5" alignItems="center">
                        <Heading textAlign="center">Personal Info</Heading>
                        <Text textAlign="center">Basic stuff</Text>
                        <Card width="2xl" paddingY="5">
                            <CardHeader>
                                <Flex justifyContent="space-between" columnGap="">
                                    <Box>
                                        <Heading>
                                            Profile
                                        </Heading>
                                        <Text>
                                            Some random info you want to put out there
                                        </Text>
                                    </Box>
                                    {
                                        editableStatus ?
                                        <Button type="button" colorScheme="whatsapp" onClick={(e)=>{
                                            e.preventDefault()
                                            dispatch(setEditable(false))
                                            dispatch(updateUser({ name : profileName, bio: profileBio, mobile: profileMobile , email: data?.email, password : profilePassword }))
                                        }}>
                                        Save
                                    </Button>
                                        :
                                        <Button colorScheme="teal" onClick={(e)=>{
                                            e.preventDefault()
                                            dispatch(setEditable(true))
                                        }}>
                                        Edit
                                        </Button>
                                    }
                                </Flex>
                            </CardHeader>
                            <Divider color="gray.300"  />
                            <CardBody paddingX="0">
                                <Stack divider={<StackDivider/>} rowGap="3" >
                                    <Flex justifyContent="space-around" >
                                        <Text textColor="gray" >
                                            PHOTO
                                        </Text>
                                        <Flex width="xs">
                                            <Image boxSize="100px" src={ProfilePic} alt=""/>
                                        </Flex>
                                    </Flex>
                                    <ProfileAttribute attributeName="NAME" attribute={profileName} setAttribute={setProfileName}/>
                                    <ProfileAttribute attributeName="BIO" attribute={profileBio} setAttribute={setProfileBio}/>
                                    <ProfileAttribute attributeName="PHONE" attribute={profileMobile} setAttribute={setProfileMobile}/>
                                    {
                                        editableStatus ?
                                        <>
                                            <Flex justifyContent="space-around" >
                                                <Text textColor="gray" >
                                                    PASSWORD
                                                </Text>
                                                <Flex width="xs">
                                                        <Input type="text" value={profilePassword} onChange={(e)=>{setProfilePassword(e.target.value)}}/>
                                                </Flex>
                                            </Flex> 
                                        </>
                                        :
                                        ""
                                    }
                                </Stack>
                            </CardBody>
                        </Card>
                    </Box>
                    <Footer/>
                {/* </Container> */}
            </>
        )
    }
    else if(status===statusValues.Pending){
        return(
            <>
                <Flex justifyContent="center" alignItems="center">
                    <Spinner size="xl"/>
                </Flex>
            </>
            )
    }
    else{
        return(
            <>
                <Flex justifyContent="center" alignItems="center">
                    <Alert status="error">
                        <AlertIcon/>
                        <AlertTitle>Couldn't fetch user details</AlertTitle>
                    </Alert>
                </Flex>
            </>
            )
    }
    
}