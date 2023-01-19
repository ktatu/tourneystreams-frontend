import React, { useState } from "react"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import Box from "@mui/material/Box"

const ListMenu = ({
    menuIcon,
    menuContent,
}: {
    menuIcon: JSX.Element
    menuContent: JSX.Element
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const isOpen = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    return (
        <Box>
            <IconButton onClick={handleClick}>{menuIcon}</IconButton>
            <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
            >
                {menuContent}
            </Menu>
        </Box>
    )
}

export default ListMenu
