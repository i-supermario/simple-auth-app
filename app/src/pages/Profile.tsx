import { Box, Button, Card, CardBody, CardHeader, Container, Divider, Flex, HStack, Heading, Image, Stack, StackDivider, Text } from "@chakra-ui/react";
import Header from "../components/header";
import ProfilePic from "../media/logo192.png"
import { useLocation } from "react-router";


export default function Profile(){

    const location = useLocation()
    console.log(location.state)

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
                                    Name bata de
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
                                    ajsb@gmail.com
                                    </Text>
                                </Flex>
                            </Flex>
                            <Flex justifyContent="space-around" >
                                <Text textColor="gray" >
                                    PASSWORD
                                </Text>
                                <Flex width="xs">
                                    <Text as="b">
                                    *********
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