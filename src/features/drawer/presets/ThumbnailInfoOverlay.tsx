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
                top={0}
                sx={{ borderBottomRightRadius: "5px" }}
            >
                <Typography variant="h5">{presetName}</Typography>
            </Box>
            <Box
                bgcolor="rgba(0, 0, 0, 0.4)"
                left={0}
                padding={0.5}
                position="absolute"
                top={178}
                sx={{ borderTopRightRadius: "5px" }}
            >
                <div style={{ userSelect: "none" }}>{broadcastName}</div>
            </Box>
        </>
    )
}

export default ThumbnailInfoOverlay
