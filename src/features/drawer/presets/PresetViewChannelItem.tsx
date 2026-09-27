import CloseIcon from "@mui/icons-material/Close"
import { Box, IconButton, Paper, Tooltip, Typography } from "@mui/material"
import { memo } from "react"

const PresetViewChannelItem = ({ channel }: { channel: string }) => {
    return (
        <Paper
            sx={{ minWidth: 200, height: 50, textAlign: "center" }}
            variant="outlined"
        >
            <Box
                alignItems="center"
                display="flex"
                height="100%"
                paddingLeft={1}
                paddingRight={1}
                width="100%"
            >
                <Typography
                    marginTop={0.5}
                    overflow="hidden"
                    sx={{ userSelect: "none" }}
                    variant="button"
                >
                    {channel}
                </Typography>
                <Box flexGrow={1} />
                <Box display="flex">
                    <IconButton
                        size="large"
                        sx={{ padding: 0.5 }}
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
