import { Box, Divider, IconButton, Stack, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import SettingsIcon from "@mui/icons-material/Settings"
import "../Drawer.css"

interface DrawerHeaderProps {
    title: string
    handleDrawerClose: () => void
    children: JSX.Element
}
const DrawerHeader = ({ title, handleDrawerClose, children }: DrawerHeaderProps) => {
    return (
        <Stack
            direction="column"
            paddingBottom={5}
            gap={4}
        >
            <Box
                display="flex"
                alignContent="center"
            >
                <Typography variant="h4">{title}</Typography>
                <Box
                    display="flex"
                    gap={1}
                    marginLeft="auto"
                >
                    <IconButton>
                        <SettingsIcon fontSize="large" />
                    </IconButton>
                    <IconButton onClick={handleDrawerClose}>
                        <ArrowBackIcon fontSize="large" />
                    </IconButton>
                </Box>
            </Box>
            <Box>{children}</Box>
        </Stack>
    )
}

export default DrawerHeader
