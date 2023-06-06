import { Container, Flex } from "@chakra-ui/react";
import ToggleColor from "./togglecolor";
import DropDown from "./dropdown";

export default function Header(){
    return(
        <>
            <Flex paddingX="10" justifyContent="space-between">
                <ToggleColor/>
                <DropDown/>
            </Flex>
        </>
    )
}