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
            alignItems="center"
            display="flex"
            gap={1}
        >
            <TextField
                label="Add stream"
                placeholder="Channel name"
                value={addStreamFieldValue}
                variant="outlined"
                onChange={handleStreamField}
            />
            <Button
                color="primary"
                variant="contained"
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
