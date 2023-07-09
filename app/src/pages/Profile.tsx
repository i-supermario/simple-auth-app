import { Box, Button, Card, CardBody, CardHeader, Divider, Flex, Heading, Image, Input, Stack, StackDivider, Text } from "@chakra-ui/react";
import Header from "../components/header";
import ProfilePic from "../media/logo192.png"
import { useDispatch, useSelector } from "react-redux";
import { selectData, selectStatus, statusValues } from "../slices/profile";
import { setEditable, selectProfileEditableStatus } from "../slices/editableprofile";
import { AppDispatch } from "../store";
import { useEffect, useState } from "react";
import { editableResponse } from "../types/response";
import { updateUser } from "../thunks/updateuser";






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
        console.log(data?.bio)
        console.log(data?.mobile)
        console.log(data?.name)
        setProfileBio(data?.bio)
        setProfileMobile(data?.mobile)
        setProfileName(data?.name)
        setProfilePassword(data?.password)
    },[])


    if(editableStatus){
        return(
            <>
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
                                <Button type="button" colorScheme="blackAlpha" onClick={(e)=>{
                                        e.preventDefault()
                                        dispatch(setEditable(false))
                                        dispatch(updateUser({ name : profileName, bio: profileBio, mobile: profileMobile , email: data?.email, password : profilePassword }))
                                    }}>
                                    Save
                                </Button>
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
                                <Flex justifyContent="space-around" >
                                    <Text textColor="gray" >
                                        NAME
                                    </Text>
                                    <Flex width="xs">
                                        <Input type="text" value={profileName} onChange={(e)=>{setProfileName(e.target.value)}}/>
                                    </Flex>
                                </Flex>
                                <Flex justifyContent="space-around" >
                                    <Text textColor="gray" >
                                        BIO
                                    </Text>
                                    <Flex width="xs">
                                        <Input type="text" value={profileBio} onChange={(e)=>{setProfileBio(e.target.value)}}/>
                                    </Flex>
                                </Flex>
                                <Flex justifyContent="space-around" >
                                    <Text textColor="gray" >
                                        PHONE
                                    </Text>
                                    <Flex width="xs">
                                        <Input type="text" value={profileMobile} onChange={(e)=>{setProfileMobile(e.target.value)}}/>
                                    </Flex>
                                </Flex>
                                <Flex justifyContent="space-around" >
                                    <Text textColor="gray" >
                                        EMAIL
                                    </Text>
                                    <Flex width="xs">
                                        <Text as="b">{data?.email}</Text>
                                    </Flex>
                                </Flex>
                                <Flex justifyContent="space-around" >
                                    <Text textColor="gray" >
                                        PASSWORD
                                    </Text>
                                    <Flex width="xs">
                                        <Input type="password" value={profilePassword} onChange={(e)=>{setProfilePassword(e.target.value)}} />
                                    </Flex>
                                </Flex>
                            </Stack>
                        </CardBody>
                    </Card>
                </Box>
            </>
        )
    }
    else if(status===statusValues.Success && !editableStatus){
        return(
            <>
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
                                <Button colorScheme="gray" onClick={(e)=>{
                                        e.preventDefault()
                                        dispatch(setEditable(true))
                                    }}>
                                    Edit
                                </Button>
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
                                <Flex justifyContent="space-around" >
                                    <Text textColor="gray" >
                                        NAME
                                    </Text>
                                    <Flex width="xs">
                                        <Text as="b">
                                        {profileName}
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Flex justifyContent="space-around" >
                                    <Text textColor="gray" >
                                        BIO
                                    </Text>
                                    <Flex width="xs">
                                        <Text as="b">
                                        {profileBio}
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Flex justifyContent="space-around" >
                                    <Text textColor="gray" >
                                        PHONE
                                    </Text>
                                    <Flex width="xs">
                                        <Text as="b">
                                        {profileMobile}
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Flex justifyContent="space-around" >
                                    <Text textColor="gray" >
                                        EMAIL
                                    </Text>
                                    <Flex width="xs">
                                        <Text as="b">
                                        {data?.email}
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Flex justifyContent="space-around" >
                                    <Text textColor="gray" >
                                        PASSWORD
                                    </Text>
                                    <Flex width="xs">
                                        <Text overflowX="clip" as="b">
                                        {profilePassword}
                                        </Text>
                                    </Flex>
                                </Flex>
                            </Stack>
                        </CardBody>
                    </Card>
                </Box>
            </>
        )
    }
    else{
        return(
            <>
                <Box>
                    Loading
                </Box>
            </>
            )
    }
    
}