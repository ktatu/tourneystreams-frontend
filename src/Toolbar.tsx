import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    AppBar,
    Button,
    Box,
    Toolbar as MuiToolbar,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from "@mui/material"
import useQueryParams from "./hooks/useQueryParams"
import TourneyDrawer from "./TourneyDrawer"

const Toolbar = () => {
    const [togglePageValue, setTogglePageValue] = useState("/")
    const navigate = useNavigate()

    const channels = useQueryParams("channel")

    const handlePageNavigation = (event: React.MouseEvent<HTMLElement>, newPage: string | null) => {
        if (newPage === null) {
            return
        }

        setTogglePageValue(newPage)
        navigate({
            pathname: newPage,
            search: `?${channels.getValuesAsQueryString()}`,
        })
    }

    return (
        <Box flexGrow={1}>
            <AppBar
                position="relative"
                sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <MuiToolbar sx={{ gap: "50px" }}>
                    <ToggleButtonGroup
                        value={togglePageValue}
                        onChange={handlePageNavigation}
                        exclusive
                    >
                        <ToggleButton value="/">Show</ToggleButton>
                        <ToggleButton value="/streamview">Hide</ToggleButton>
                    </ToggleButtonGroup>
                    <Box flexGrow={1}>
                        <AddStreamField />
                    </Box>
                    <Button color="inherit">Change color scheme</Button>
                </MuiToolbar>
            </AppBar>
        </Box>
    )
}

const AddStreamField = () => {
    const [fieldValue, setFieldValue] = useState("")
    const channels = useQueryParams("channel")

    const handleAddStream = () => {
        channels.addValue(fieldValue)
    }

    return (
        <Box
            display="flex"
            marginLeft="10px"
            gap={1}
        >
            <TextField
                sx={{ bgcolor: "grey" }}
                label="channel name"
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

export default Toolbar
