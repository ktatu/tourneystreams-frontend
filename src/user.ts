import { createLogicalAnd } from "typescript"

enum ColorModePreference {
    dark = "DARK",
    light = "LIGHT",
    unknown = "UNKNOWN",
}

class User {
    private _colorModePreference: ColorModePreference
    firstTimeUser = false

    constructor() {
        try {
            const colorMode = localStorage.getItem("colorMode") as ColorModePreference
            if (!colorMode) {
                throw new Error("User color mode not defined")
            }

            this._colorModePreference = colorMode
        } catch {
            this.firstTimeUser = true
            this._colorModePreference = ColorModePreference.unknown
        }
    }

    get colorModePreference(): ColorModePreference {
        return this._colorModePreference
    }
}

export default User
