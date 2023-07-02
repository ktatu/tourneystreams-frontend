import { Box, Divider, IconButton, Stack, Typography } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
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
            gap={3}
        >
            <Box
                display="flex"
                alignContent="center"
            >
                <Typography variant="h4">{title}</Typography>
                <IconButton
                    onClick={handleDrawerClose}
                    sx={{ marginLeft: "auto" }}
                >
                    <ArrowBackIcon fontSize="large" />
                </IconButton>
            </Box>
            <Box>{children}</Box>
        </Stack>
    )
}

export default DrawerHeader
