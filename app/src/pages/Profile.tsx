import { Box, Button, Card, CardBody, CardHeader, Divider, Flex, Heading, Image, Input, Stack, StackDivider, Text } from "@chakra-ui/react";
import Header from "../components/header";
import ProfilePic from "../media/logo192.png"
import { useDispatch, useSelector } from "react-redux";
import { selectData, selectStatus, statusValues, update } from "../reducers/profile";
import { editable, notEditable, selectProfileEditableStatus } from "../reducers/editableprofile";
import { AppDispatch } from "../store";
import { useState } from "react";
import { UserI } from "../types/common";






export default function Profile(){

    const status = useSelector(selectStatus)
    const data = useSelector(selectData)?.user
    const editableStatus = useSelector(selectProfileEditableStatus)
    const dispatch = useDispatch<AppDispatch>()
    const [profileName,setProfileName] = useState<string>()
    const [profileBio,setProfileBio] = useState<string>()
    const [profileMobile,setProfileMobile] = useState<string>()
    const [profilePassword,setProfilePassword] = useState<string>()


    if(editableStatus){
        console.log("editable")
        console.log(editableStatus)
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
                                        dispatch(notEditable())
                                        dispatch(update({  name : profileName, bio: profileBio, mobile: profileMobile , email: data?.email, password : profilePassword, __v : data?.__v, _id: data?._id }))
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
    else if(status===statusValues.LoggedIn || status===statusValues.SignedUp || !editableStatus){
        console.log("not editable")
        console.log(editableStatus)
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
                                        dispatch(editable())
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
                                        {data?.name}
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Flex justifyContent="space-around" >
                                    <Text textColor="gray" >
                                        BIO
                                    </Text>
                                    <Flex width="xs">
                                        <Text as="b">
                                        {data?.bio}
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Flex justifyContent="space-around" >
                                    <Text textColor="gray" >
                                        PHONE
                                    </Text>
                                    <Flex width="xs">
                                        <Text as="b">
                                        {data?.mobile}
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
                                        <Text as="b">
                                        {data?.password}
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
    if(status===statusValues.Rejected){
        return(
            <>
                <Box>
                    Registration failed
                </Box>
            </>
        )
    }

    return(
        <>
            <Box>
                Loading
            </Box>
        </>
        )
    
}