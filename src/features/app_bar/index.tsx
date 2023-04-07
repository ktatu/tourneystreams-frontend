import { useState } from "react"
import { AppBar as MuiAppBar, Button, Box, Toolbar, TextField, IconButton } from "@mui/material"
import { useStreamContext } from "../../commons/streamReducer"
import MenuIcon from "@mui/icons-material/Menu"
import ChatControls from "./ChatControls"

interface AppBarProps {
    handleTourneyDrawerOpen: () => void
}

const AppBar = ({ handleTourneyDrawerOpen }: AppBarProps) => {
    return (
        <Box flexGrow={1}>
            <MuiAppBar
                position="fixed"
                sx={{ zIndex: (theme) => theme.zIndex.drawer - 1 }}
            >
                <Toolbar>
                    <IconButton onClick={handleTourneyDrawerOpen}>
                        <MenuIcon fontSize="large" />
                    </IconButton>
                    <Box
                        marginLeft="24%"
                        paddingRight={10}
                    >
                        <AddStreamField />
                    </Box>
                    <Box flexGrow={1} />
                    <ChatControls />
                </Toolbar>
            </MuiAppBar>
        </Box>
    )
}

const AddStreamField = () => {
    const [fieldValue, setFieldValue] = useState("")
    const { addStream } = useStreamContext()

    const handleAddStream = () => {
        if (fieldValue === "") {
            return
        }
        addStream(fieldValue)
    }

    return (
        <Box
            display="flex"
            marginLeft="10px"
            gap={1}
        >
            <TextField
                sx={{ bgcolor: "grey" }}
                label="Channel"
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

export default AppBar
