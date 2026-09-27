// AI-generated fix by GitHub Copilot (Claude Sonnet 4.5): wrapped Snackbar in a Portal so it always escapes ancestor stacking contexts (e.g. the Drawer), matching Menu/Dialog/Popover behavior.
import { Alert as MuiAlert, Portal, Snackbar } from "@mui/material"

type severity = "success" | "error"

interface AlertProps {
    message: string
    open: boolean
    handleClose: () => void
    severity: severity
}

const Alert = ({ message, open, handleClose, severity }: AlertProps) => {
    return (
        <Portal>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={5000}
                open={open}
                sx={{ userSelect: "none" }}
                onClick={handleClose}
                onClose={handleClose}
            >
                <MuiAlert
                    severity={severity}
                    sx={{ width: "100%" }}
                    variant="filled"
                >
                    {message}
                </MuiAlert>
            </Snackbar>
        </Portal>
    )
}

export default Alert
