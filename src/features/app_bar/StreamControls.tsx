import { Box, TextField, Button, Typography } from "@mui/material"
import { useState } from "react"
import { useStreamContext } from "../../commons/streamReducer"
import StreamList from "./StreamList"

const StreamControls = () => {
    const { addStream } = useStreamContext()
    const [addStreamFieldValue, setAddStreamFieldValue] = useState("")

    const handleAddStream = () => {
        if (!addStreamFieldValue) {
            return
        }
        addStream(addStreamFieldValue)
        setAddStreamFieldValue("")
    }

    const handleStreamField = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddStreamFieldValue(event.target.value)
    }

    return (
        <Box
            display="flex"
            gap={1}
            alignItems="center"
        >
            <TextField
                label="Add stream"
                placeholder="Channel name"
                variant="outlined"
                onChange={handleStreamField}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddStream}
            >
                <Typography variant="h4">+</Typography>
            </Button>
            <Box paddingRight={10} />
            <StreamList />
        </Box>
    )
}

export default StreamControls
