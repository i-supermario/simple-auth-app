import { Button, Card, CardBody, CardHeader, Container, Stack, Image, Input, Spacer, Text, HStack, CardFooter } from "@chakra-ui/react";
import Logo from "../media/devchallenges.svg"
import GoogleLogo from "../media/Google.svg"
import FacebookLogo from "../media/Facebook.svg"
import TwitterLogo from "../media/Twitter.svg"
import GithubLogo from "../media/Gihub.svg"
import Header from "../components/header";
import ToggleColor from "../components/togglecolor";
import { Link } from "react-router-dom";

type AppProps = {
    message : string | null
}

const Home = ({message: string}:AppProps):JSX.Element => {
    return(
        <>
            <Container padding="4">
                <Card variant='outline' width="sm" paddingY="9" paddingX="7" borderRadius="3xl">
                    <CardHeader>
                        <ToggleColor/>
                    </CardHeader>
                    <CardBody>
                        <Stack alignContent="center" rowGap="2" >
                            <Text as="b" >Join thousands of learners from around the world</Text>
                            <Text>Master web development by making real life projects. There are multiple paths for you to choose</Text>
                            <Input placeholder="Email" size="md"/>
                            <Input placeholder="Password" size="md"/>
                            <Button colorScheme="blue">Start coding now</Button>
                            <Text fontSize="xs" fontWeight="thin" textAlign="center" >or continue with these social profile</Text>
                            <HStack justifyContent="space-around" >
                                <Image src={GoogleLogo} />
                                <Image src={FacebookLogo} />
                                <Image src={TwitterLogo} />
                                <Image src={GithubLogo} />
                            </HStack>
                        </Stack>
                    </CardBody>
                    <CardFooter justifyContent="center" paddingY="0">
                        <Text fontSize="xs" fontWeight="thin">Already a member?
                            <Link color="blue" to={"/login"}>
                                Login
                            </Link>
                        </Text>
                    </CardFooter>
                </Card>
            </Container> 
        </>
    )
}

export default Home;
