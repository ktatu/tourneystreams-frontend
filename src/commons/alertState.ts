import { proxy, useSnapshot } from "valtio"

export type severity = "success" | "error"

interface AlertState {
    message: string
    severity: severity
}

const alertState = proxy<AlertState>({
    message: "",
    severity: "success",
})

export const addAlert = (message: string, severity: severity) => {
    alertState.message = message
    alertState.severity = severity
}

export const removeAlert = () => {
    alertState.message = ""
}

export const useAlertState = () => useSnapshot(alertState)
