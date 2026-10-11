// AI-assisted by Claude Sonnet 5.5 (GitHub Copilot): moved MUI system props into sx, as part of the Vite/dependency migration.
import { Box, Checkbox, Typography } from "@mui/material"
import { useState } from "react"
import UserSettings, { UserSetting } from "./UserSettings"

interface CheckboxSettingProps {
    setting: UserSetting
    settingDescription: string
}

const CheckboxSetting = ({
    setting,
    settingDescription: optionDescription,
}: CheckboxSettingProps) => {
    const [optionVal, setOptionVal] = useState(() => UserSettings.get(setting))

    const handleOptionValChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.checked

        UserSettings.save(setting, newValue)
        setOptionVal(newValue)
    }

    return (
        <Box
            sx={{
                alignItems: "center",
                display: "flex",
                gap: 0.5,
            }}
        >
            <Checkbox
                checked={Boolean(optionVal)}
                onChange={handleOptionValChange}
            />
            <Typography sx={{ marginTop: 0.2 }}>{optionDescription}</Typography>
        </Box>
    )
}

export default CheckboxSetting
