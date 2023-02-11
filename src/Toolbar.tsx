import { useState } from "react"
import { NavLink, Link, useNavigate, useSearchParams } from "react-router-dom"
import {
    AppBar,
    Button,
    Box,
    Toolbar as MuiToolbar,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    styled,
    alpha,
} from "@mui/material"
import useChannels from "./hooks/useChannels"

const Toolbar = () => {
    const [togglePageValue, setTogglePageValue] = useState("/")
    const navigate = useNavigate()

    const [preferencesDialogOpen, setPreferencesDialogOpen] = useState(false)

    const handlePreferencesDialogOpen = () => {
        return setPreferencesDialogOpen(true)
    }

    const handlePreferencesDialogClose = () => {
        setPreferencesDialogOpen(false)
    }

    const handlePageToggle = (
        event: React.MouseEvent<HTMLElement>,
        newTogglePageValue: string | null
    ) => {
        if (newTogglePageValue !== null) {
            setTogglePageValue(newTogglePageValue)
        }
        navigate(togglePageValue)
    }

    return (
        <Box flexGrow={1}>
            <AppBar position="static">
                <MuiToolbar sx={{ gap: "50px" }}>
                    <ToggleButtonGroup
                        value={togglePageValue}
                        onChange={handlePageToggle}
                        exclusive
                    >
                        <ToggleButton value="/">Home</ToggleButton>
                        <ToggleButton value="/streamview">Streamview</ToggleButton>
                    </ToggleButtonGroup>
                    <Box flexGrow={1}>
                        <AddStreamField />
                    </Box>
                    <Button
                        color="inherit"
                        onClick={handlePreferencesDialogOpen}
                    >
                        Change color scheme
                    </Button>
                </MuiToolbar>
            </AppBar>
        </Box>
    )
}

const AddStreamField = () => {
    const [fieldValue, setFieldValue] = useState("")
    const channelsHook = useChannels()

    const handleAddStream = () => {
        channelsHook.addStream(fieldValue)
    }

    return (
        <Box
            display="flex"
            marginLeft="10px"
        >
            <TextField
                sx={{ bgcolor: "grey" }}
                label="channel"
                variant="outlined"
                value={fieldValue}
                onChange={(event) => setFieldValue(event.target.value)}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddStream}
            >
                Add stream
            </Button>
        </Box>
    )
}

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
}))

export default Toolbar
