// AI-assisted by Claude Sonnet 5.5 (GitHub Copilot): moved MUI system props into sx, as part of the Vite/dependency migration.
import CloseIcon from "@mui/icons-material/Close"
import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material"
import { memo } from "react"

interface PresetViewChannelItemProps {
    channel: string
    handleRemoveChannel: (channel: string) => void
}

const PresetViewChannelItem = ({ channel, handleRemoveChannel }: PresetViewChannelItemProps) => {
    return (
        <Paper
            sx={{ minWidth: 200, height: 50, textAlign: "center" }}
            variant="outlined"
        >
            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                    height: "100%",
                    paddingLeft: 1,
                    paddingRight: 1,
                    width: "100%"
                }}>
                <Typography
                    variant="button"
                    sx={{
                        marginTop: 0.5,
                        overflow: "hidden",
                        userSelect: "none"
                    }}>
                    {channel}
                </Typography>
                <Box sx={{
                    flexGrow: 1
                }} />
                <Box sx={{
                    display: "flex"
                }}>
                    <IconButton
                        size="large"
                        sx={{ padding: 0.5 }}
                        onClick={() => handleRemoveChannel(channel)}
                    >
                        <Tooltip title="Remove channel">
                            <CloseIcon fontSize="medium" />
                        </Tooltip>
                    </IconButton>
                </Box>
            </Box>
        </Paper>
    )
}

export default memo(PresetViewChannelItem)
