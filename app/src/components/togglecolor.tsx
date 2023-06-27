import { Image, useColorMode } from "@chakra-ui/react"
import Logo from "../media/devchallenges.svg"



export default function ToggleColor() {
    const { toggleColorMode } = useColorMode()
    return (
        <>
        {/* <Button onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button> */}
            <Image src={Logo} onClick={toggleColorMode} />
        </>
    )
  }