import { Alert as MuiAlert, Snackbar } from "@mui/material"

type severity = "success" | "error"

interface AlertProps {
    message: string
    open: boolean
    handleClose: () => void
    severity: severity
}

const Alert = ({ message, open, handleClose, severity }: AlertProps) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={5000}
            open={open}
            sx={{ userSelect: "none", "&.MuiSnackbar-root": { top: "10px" } }}
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
    )
}

export default Alert
