import { Container, Image, Link } from "@chakra-ui/react";
import GithubLogo from "../media/Gihub.svg"


export default function Footer(){
    return(
        <>
            <Container margin={"0"} display={"flex"} justifyContent={"flex-start"} padding={"30px"} position="fixed" bottom="0">
                <Link href="https://github.com/i-supermario" textDecoration={"none"} ><Image src={GithubLogo}/></Link>
            </Container>
        </>
    )
}