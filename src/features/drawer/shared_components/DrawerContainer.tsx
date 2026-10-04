// AI-assisted by Claude Sonnet 5.5 (GitHub Copilot): replaced JSX.Element with React.JSX.Element, moved MUI system props into sx, as part of the Vite/dependency migration.
import { Box } from "@mui/material"

interface DrawerContainerProps {
    children: React.JSX.Element
}

const DrawerContainer = ({ children }: DrawerContainerProps) => {
    return (
        <Box
            sx={{
                paddingBottom: 4,
                paddingLeft: 3,
                paddingRight: 3,
                paddingTop: 3
            }}>
            {children}
        </Box>
    )
}

export default DrawerContainer
