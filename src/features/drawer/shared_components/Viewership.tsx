import BoyIcon from "@mui/icons-material/Boy"
import { Tooltip, Box, Typography } from "@mui/material"

interface ViewershipProps {
    viewerCount: number
}

const Viewership = ({ viewerCount }: ViewershipProps) => {
    return (
        <Tooltip title="Viewers">
            <Box
                alignItems="center"
                display="flex"
                flexDirection="row"
            >
                <Typography
                    color="#F75750"
                    variant="h5"
                >
                    {viewerCount}
                </Typography>
                <BoyIcon
                    fontSize="medium"
                    sx={{ color: "#F75750" }}
                />
            </Box>
        </Tooltip>
    )
}

export default Viewership
