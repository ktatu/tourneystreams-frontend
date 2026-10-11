import { proxy, useSnapshot } from "valtio"

export type Severity = "success" | "error" | "info"

interface AlertState {
    message: string
    severity: Severity
}

const alertState = proxy<AlertState>({
    message: "",
    severity: "success",
})

export const addAlert = (message: string, severity: Severity) => {
    alertState.message = message
    alertState.severity = severity
}

export const removeAlert = () => {
    alertState.message = ""
}

export const useAlertState = () => useSnapshot(alertState)
