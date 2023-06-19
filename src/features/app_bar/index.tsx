import { AppBar as MuiAppBar, Box, Toolbar, IconButton } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import StreamSection from "./StreamSection"

interface AppBarProps {
    setTourneyDrawerOpen: (newDisplayStatus: boolean) => void
    tourneyDrawerOpen: boolean
}

const AppBar = ({ setTourneyDrawerOpen, tourneyDrawerOpen }: AppBarProps) => {
    const handleTourneyDrawerDisplayButtonClick = () => {
        tourneyDrawerOpen ? setTourneyDrawerOpen(false) : setTourneyDrawerOpen(true)
    }

    return (
        <Box flexGrow={1}>
            <MuiAppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <Toolbar>
                    <Box
                        display="flex"
                        marginRight="auto"
                        gap={10}
                    >
                        <IconButton onClick={handleTourneyDrawerDisplayButtonClick}>
                            <MenuIcon fontSize="large" />
                        </IconButton>
                        <Box>
                            <StreamSection />
                        </Box>
                    </Box>
                </Toolbar>
            </MuiAppBar>
        </Box>
    )
}

export default AppBar
