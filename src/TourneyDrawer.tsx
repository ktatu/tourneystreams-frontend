import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Box,
    Button,
    Checkbox,
    Divider,
    Drawer,
    Input,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Toolbar,
    Typography,
} from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import useCheckbox from "./hooks/useCheckbox"
import PopupMenu from "./shared_components/PopupMenu"

import HomeIcon from "@mui/icons-material/Home"

import TourneyStartTime from "./TourneyStartTime"

import "./TourneyDrawer.css"
import TourneyAccordion from "./TourneyAccordion"

const TourneyDrawer = () => {
    return (
        <Drawer
            sx={{
                flexShrink: 0,
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar />
            <Divider />
            <Box className="drawer-container">
                <Box>
                    <Typography variant="h4">Tournaments</Typography>
                    <Box paddingTop={3}>
                        <Typography variant="body1">Filters:</Typography>
                        <Box
                            display="flex"
                            flexDirection="row"
                            paddingTop={1}
                            gap={1}
                        >
                            <PopupMenu
                                buttonProps={{
                                    buttonText: "Games",
                                }}
                                menuContent={<GameOptionsMenuContent />}
                            />
                            <Input placeholder="Tournament name" />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Divider />
            <Box className="drawer-container">
                <Typography variant="h5">Today</Typography>
                <Accordion
                    TransitionProps={{ unmountOnExit: true }}
                    onChange={() => console.log("on change")}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Box
                            display="flex"
                            flexDirection="row"
                            gap={3}
                            paddingRight={2}
                        >
                            <Typography variant="h6">
                                BLAST.tv Paris Major 2023: European RMR A AAAA
                            </Typography>
                            <Box flexGrow={1} />
                            <Box
                                display="flex"
                                alignItems="center"
                            >
                                <TourneyStartTime startTimeAsDate={new Date(Date.now())} />
                            </Box>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box
                            display="flex"
                            flexDirection="column"
                            gap={2}
                        >
                            <Box
                                display="flex"
                                flexDirection="row"
                                paddingRight={5}
                            >
                                <Box paddingRight="8px">
                                    <img
                                        src={require("./assets/liquipedia.png")}
                                        width={32}
                                        height={26}
                                    />
                                </Box>
                                <Box paddingRight="10px">
                                    <img
                                        src={require("./assets/twitter.png")}
                                        width={32}
                                        height={26}
                                    />
                                </Box>
                                <HomeIcon sx={{ transform: "scale(1.5)", marginTop: "2px" }} />
                            </Box>
                            <Box>
                                <Typography>Official streams:</Typography>
                            </Box>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            </Box>
            <TourneyAccordion />
        </Drawer>
    )
}

const GameOptionsMenuContent = () => {
    const apexCheckbox = useCheckbox()
    const starcraftCheckbox = useCheckbox()

    return (
        <MenuList>
            <MenuItem onClick={apexCheckbox.handleToggle}>
                <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Apex Legends</ListItemText>
                <Checkbox checked={apexCheckbox.checked} />
            </MenuItem>
            <MenuItem onClick={starcraftCheckbox.handleToggle}>
                <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>StarCraft 2</ListItemText>
                <Checkbox checked={starcraftCheckbox.checked} />
            </MenuItem>
        </MenuList>
    )
}

export default TourneyDrawer
