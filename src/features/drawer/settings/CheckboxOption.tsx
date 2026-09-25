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
            display="flex"
            gap={0.5}
            alignItems="center"
        >
            <Checkbox
                onChange={handleOptionValChange}
                checked={optionVal}
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
