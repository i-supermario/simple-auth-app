import { Flex, Input, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { selectProfileEditableStatus } from "../slices/editableprofile"



type AppProps = {
    attributeName: string
    attribute?: string
    setAttribute: (text: string) => void 
}

export default function ProfileAttribute(props: AppProps){

    const editable = useSelector(selectProfileEditableStatus)
    return(
        <>
            <Flex justifyContent="space-around" >
                <Text textColor="gray" >
                    {props.attributeName}
                </Text>
                <Flex width="xs">
                    {
                        editable ?
                        <Input type="text" value={props.attribute} onChange={(e)=>{props.setAttribute(e.target.value)}}/>
                        :
                        <Text as="b">
                        {props.attribute}
                        </Text>
                    }
                </Flex>
            </Flex> 
        </>
    )
}