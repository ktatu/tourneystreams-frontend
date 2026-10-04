// AI-assisted by Claude Sonnet 5.5 (GitHub Copilot): replaced JSX.Element with React.JSX.Element, moved MUI system props into sx, as part of the Vite/dependency migration.
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { Box, IconButton, Typography } from "@mui/material"
import "../Drawer.css"

interface DrawerHeaderProps {
    title: string
    handleDrawerClose: () => void
    children?: React.JSX.Element
}
const DrawerHeader = ({ title, handleDrawerClose, children }: DrawerHeaderProps) => {
    return (
        <Box
            sx={{
                alignContent: "center",
                display: "flex",
                marginBottom: 3
            }}>
            <Typography variant="h4">{title}</Typography>
            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    marginLeft: "auto"
                }}>
                {children}
                <IconButton onClick={handleDrawerClose}>
                    <ArrowBackIcon fontSize="large" />
                </IconButton>
            </Box>
        </Box>
    )
}

export default DrawerHeader
