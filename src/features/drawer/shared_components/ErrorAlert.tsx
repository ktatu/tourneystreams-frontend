import { Alert, Snackbar } from "@mui/material"

interface ErrorAlertProps {
    message: string
    open: boolean
    handleClose: () => void
}

const ErrorAlert = ({ message, open, handleClose }: ErrorAlertProps) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={5000}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            sx={{ userSelect: "none" }}
        >
            <Alert
                variant="filled"
                severity="error"
                sx={{ width: "100%" }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

export default ErrorAlert
