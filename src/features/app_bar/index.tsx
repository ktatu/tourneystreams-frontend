import {
    AppBar as MuiAppBar,
    Box,
    Toolbar,
    IconButton,
    ToggleButton,
    ToggleButtonGroup,
    SvgIcon,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import StreamSection from "./StreamSection"
import { ReactComponent as TwitchLogo } from "../../assets/TwitchLogo.svg"

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
                        gap={10}
                    >
                        <IconButton onClick={handleTourneyDrawerDisplayButtonClick}>
                            <MenuIcon fontSize="large" />
                        </IconButton>
                        <ToggleButtonGroup exclusive>
                            <ToggleButton value="tournaments">Tournaments</ToggleButton>
                            <ToggleButton value="twitch-streams">
                                <SvgIcon sx={{ marginRight: 1 }}>
                                    <TwitchLogo />
                                </SvgIcon>
                                Streams
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <StreamSection />
                    </Box>
                </Toolbar>
            </MuiAppBar>
        </Box>
    )
}

export default AppBar
