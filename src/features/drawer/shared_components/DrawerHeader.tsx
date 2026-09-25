import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { Box, IconButton, Typography } from "@mui/material"
import "../Drawer.css"

interface DrawerHeaderProps {
    title: string
    handleDrawerClose: () => void
    children?: JSX.Element
}
const DrawerHeader = ({ title, handleDrawerClose, children }: DrawerHeaderProps) => {
    return (
        <Box
            alignContent="center"
            display="flex"
            marginBottom={3}
        >
            <Typography variant="h4">{title}</Typography>
            <Box
                display="flex"
                gap={2}
                marginLeft="auto"
            >
                {children}
                <IconButton onClick={handleDrawerClose}>
                    <ArrowBackIcon fontSize="large" />
                </IconButton>
            </Box>
        </Box>
    )
}

export default DrawerHeader
