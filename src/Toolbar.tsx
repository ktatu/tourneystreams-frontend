import { useState } from "react"
import {
    AppBar,
    Button,
    Box,
    Toolbar as MuiToolbar,
    Tab,
    Tabs,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    styled,
    alpha,
} from "@mui/material"
import { useDispatch } from "react-redux"
import { addChannel } from "./reducers/channelReducer"

const Toolbar = () => {
    const [pageValue, setPageValue] = useState("home")

    const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
        setPageValue(newAlignment)
    }

    return (
        <Box flexGrow={1}>
            <AppBar position="static">
                <MuiToolbar sx={{ gap: "50px" }}>
                    <ToggleButtonGroup
                        value={pageValue}
                        onChange={handleChange}
                        exclusive
                    >
                        <ToggleButton value="home">Home</ToggleButton>
                        <ToggleButton value="streamview">Streamview</ToggleButton>
                    </ToggleButtonGroup>
                    <AddStreamField />
                </MuiToolbar>
            </AppBar>
        </Box>
    )
}

const AddStreamField = () => {
    const [fieldValue, setFieldValue] = useState("")
    const dispatch = useDispatch()

    const handleAddStream = () => {
        if (fieldValue !== "") {
            dispatch(addChannel(fieldValue))
            setFieldValue("")
        }
    }

    return (
        <Box
            display="flex"
            marginLeft="10px"
        >
            <TextField
                sx={{ bgcolor: "grey" }}
                label="twitch.tv/stream"
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
