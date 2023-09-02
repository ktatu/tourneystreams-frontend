import {
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    FormGroup,
} from "@mui/material"

interface PreferencesDialogProps {
    isOpen: boolean
    handleClose: () => void
}

const PreferencesDialog = ({ isOpen, handleClose }: PreferencesDialogProps) => {
    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
        >
            <DialogTitle>Selected Games</DialogTitle>
            <DialogContent dividers>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Apex Legends"
                    />
                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="StarCraft 2"
                    />
                </FormGroup>
            </DialogContent>
        </Dialog>
    )
}

export default PreferencesDialog

const text =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
