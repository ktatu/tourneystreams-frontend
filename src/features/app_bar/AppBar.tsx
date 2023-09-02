import {
    Box,
    AppBar as MuiAppBar,
    SvgIcon,
    ToggleButton,
    ToggleButtonGroup,
    Toolbar,
} from "@mui/material"
import { ReactComponent as TwitchLogo } from "../../assets/TwitchLogo.svg"
import { DrawerContentType } from "../drawer/DrawerContentSwitch"
import StreamSection from "./StreamSection"

interface AppBarProps {
    drawerContentType: DrawerContentType
    setDrawerContentType: (drawerContentType: DrawerContentType) => void
}

const AppBar = ({ drawerContentType, setDrawerContentType }: AppBarProps) => {
    const handleToggleChange = (
        event: React.MouseEvent<HTMLElement>,
        newToggleValue: DrawerContentType
    ) => {
        if (newToggleValue === null) {
            setDrawerContentType(DrawerContentType.None)
        } else {
            setDrawerContentType(newToggleValue)
        }
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
                        <ToggleButtonGroup
                            exclusive
                            value={drawerContentType}
                            onChange={handleToggleChange}
                        >
                            <ToggleButton value={DrawerContentType.TournamentContent}>
                                Tournaments
                            </ToggleButton>
                            <ToggleButton value={DrawerContentType.TwitchContent}>
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
