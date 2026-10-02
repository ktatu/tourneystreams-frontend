import { Box, Typography } from "@mui/material"

interface ThumbnailInfoOverlayProps {
    broadcastName: string
    presetName: string
}

const ThumbnailInfoOverlay = ({ broadcastName, presetName }: ThumbnailInfoOverlayProps) => {
    return (
        <>
            <Box
                bgcolor="rgba(0, 0, 0, 0.8)"
                left={0}
                padding={0.5}
                position="absolute"
                sx={{ borderBottomRightRadius: "5px" }}
                top={0}
            >
                <Typography variant="h5">{presetName}</Typography>
            </Box>
            <Box
                bgcolor="rgba(0, 0, 0, 0.4)"
                left={0}
                padding={0.5}
                position="absolute"
                sx={{ borderTopRightRadius: "5px" }}
                top={178}
            >
                <div style={{ userSelect: "none" }}>{broadcastName}</div>
            </Box>
        </>
    )
}

export default ThumbnailInfoOverlay
