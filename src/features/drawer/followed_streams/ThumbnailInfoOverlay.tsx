import { Box } from "@mui/material"
import round from "lodash.round"

const ThumbnailInfoOverlay = ({
    category,
    viewerCount,
}: {
    category: string
    viewerCount: number
}) => {
    return (
        <>
            <Box
                bgcolor="rgba(0, 0, 0, 0.4)"
                left={0}
                padding={0.5}
                position="absolute"
                top={0}
                sx={{ borderBottomRightRadius: "5px" }}
            >
                <div style={{ userSelect: "none" }}>{category}</div>
            </Box>
            <Box
                bgcolor="rgba(0, 0, 0, 0.4)"
                left={0}
                padding={0.5}
                position="absolute"
                top={178}
                sx={{ borderTopRightRadius: "5px" }}
            >
                <div style={{ userSelect: "none" }}>{parseViewerCount(viewerCount)}</div>
            </Box>
        </>
    )
}

export const parseViewerCount = (viewerCount: number) => {
    if (viewerCount < 1000) {
        return viewerCount + " viewers"
    }
    return round(viewerCount / 1000, 1) + "K viewers"
}

export default ThumbnailInfoOverlay
