import { Box, Button, Card, CardBody, CardHeader, Divider, Flex, Heading, Image, Input, Stack, StackDivider, Text } from "@chakra-ui/react";
import Header from "../components/header";
import ProfilePic from "../media/logo192.png"
import { useSelector } from "react-redux";
import { selectData, selectStatus, statusValues } from "../reducers/profile";




export default function Profile(){

    const status = useSelector(selectStatus)
    const data = useSelector(selectData)?.result


    if(status===statusValues.SignedUp){
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
                                <Button colorScheme="gray">
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
                                        <Input type="text" defaultValue={data?.email}/>
                                    </Flex>
                                </Flex>
                                <Flex justifyContent="space-around" >
                                    <Text textColor="gray" >
                                        BIO
                                    </Text>
                                    <Flex width="xs">
                                        <Input type="text" defaultValue={"enter some randon shit"}/>
                                    </Flex>
                                </Flex>
                                <Flex justifyContent="space-around" >
                                    <Text textColor="gray" >
                                        PHONE
                                    </Text>
                                    <Flex width="xs">
                                        <Input type="text" defaultValue={"tring tring!!"}/>
                                    </Flex>
                                </Flex>
                                <Flex justifyContent="space-around" >
                                    <Text textColor="gray" >
                                        EMAIL
                                    </Text>
                                    <Flex width="xs">
                                        <Input type="text" defaultValue={data?.email}/>
                                    </Flex>
                                </Flex>
                                <Flex justifyContent="space-around" >
                                    <Text textColor="gray" >
                                        PASSWORD
                                    </Text>
                                    <Flex width="xs">
                                        <Input type="password" defaultValue={data?.password} />
                                    </Flex>
                                </Flex>
                            </Stack>
                        </CardBody>
                    </Card>
                </Box>
            </>
        )
    }
    if(status===statusValues.LoggedIn){
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
                                <Button colorScheme="gray">
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
                                        {data?.email}
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Flex justifyContent="space-around" >
                                    <Text textColor="gray" >
                                        BIO
                                    </Text>
                                    <Flex width="xs">
                                        <Text as="b">
                                        oaschknajb
                                        </Text>
                                    </Flex>
                                </Flex>
                                <Flex justifyContent="space-around" >
                                    <Text textColor="gray" >
                                        PHONE
                                    </Text>
                                    <Flex width="xs">
                                        <Text as="b">
                                        989283828
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