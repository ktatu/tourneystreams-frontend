// AI-assisted by Claude Sonnet 5.5 (GitHub Copilot): moved MUI system props into sx, as part of the Vite/dependency migration.
import { Box, Checkbox, Typography } from "@mui/material"
import { useState } from "react"

interface CheckboxOptionProps {
    optionName: string
    optionDescription: string
}

const CheckboxOption = ({ optionName, optionDescription }: CheckboxOptionProps) => {
    const [optionVal, setOptionVal] = useState(() => getStoredOptionVal(optionName))

    const handleOptionValChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.checked

        setStoredOptionVal(newValue, optionName)
        setOptionVal(newValue)
    }

    return (
        <Box
            sx={{
                alignItems: "center",
                display: "flex",
                gap: 0.5
            }}>
            <Checkbox
                checked={optionVal}
                onChange={handleOptionValChange}
            />
            <Typography sx={{ marginTop: 0.2 }}>{optionDescription}</Typography>
        </Box>
    )
}

const getStoredOptionVal = (option: string) => {
    const autoCloseEndedStream = localStorage.getItem(option) === "true"

    return autoCloseEndedStream
}

const setStoredOptionVal = (newVal: boolean, optionName: string) => {
    localStorage.setItem(optionName, String(newVal))
}

export default CheckboxOption
