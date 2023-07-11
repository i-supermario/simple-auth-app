import { Flex } from "@chakra-ui/react";
import ToggleColor from "../components/togglecolor";
import DropDown from "../components/dropdown";

export default function Header(){
    return(
        <>
            <Flex padding={"30px"} justifyContent="space-between" top="0">
                <ToggleColor/>
                <DropDown/>
            </Flex>
        </>
    )
}