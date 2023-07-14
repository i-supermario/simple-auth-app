import { Flex, Image, Input, Text } from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { selectProfileEditableStatus } from "../slices/editableprofile"


type AppProps = {
    attributeName: string
    attribute?: string
    setAttribute: (text: string) => void 
}

export default function ImageAttribute(props: AppProps){

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
                        <Input type="text" placeholder="Enter image url" value={props.attribute} onChange={(e)=>{props.setAttribute(e.target.value)}}/>
                        :
                        <Flex justifyContent="space-around" >
                            <Flex width="xs">
                                <Image boxSize="100px" src={props.attribute} alt=""/>
                            </Flex>
                        </Flex>
                    }
                </Flex>
            </Flex> 
        </>
    )
}