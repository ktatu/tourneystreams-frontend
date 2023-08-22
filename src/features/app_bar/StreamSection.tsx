import { Box, TextField, Button, Typography } from "@mui/material"
import { useState } from "react"
import StreamList from "./StreamList"
import { addStream } from "../../commons/streamsState"

const StreamSection = () => {
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
                value={addStreamFieldValue}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddStream}
            >
                <Typography variant="h4">+</Typography>
            </Button>
            <Box marginLeft={10}>
                <StreamList />
            </Box>
        </Box>
    )
}

export default StreamSection
