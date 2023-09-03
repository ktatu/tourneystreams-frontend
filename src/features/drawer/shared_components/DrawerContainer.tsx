import { Box } from "@mui/material"

interface DrawerContainerProps {
    children: JSX.Element
}

const DrawerContainer = ({ children }: DrawerContainerProps) => {
    return (
        <Box
            paddingBottom={4}
            paddingLeft={3}
            paddingRight={3}
            paddingTop={3}
        >
            {children}
        </Box>
    )
}

export default DrawerContainer
