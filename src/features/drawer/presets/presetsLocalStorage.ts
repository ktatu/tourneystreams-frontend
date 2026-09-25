import { LocallyStoredPreset } from "../../../types"

export const getStoredPresets = () => {
    const storedPresetsString = localStorage.getItem("presets")
    if (!storedPresetsString) {
        return null
    }

    const parsedPresets = parseStoredPresets(storedPresetsString)

    return parsedPresets
}

const parseStoredPresets = (presetsString: string) => {
    const presets = JSON.parse(presetsString)

    if (!Array.isArray(presets)) {
        return null
    }

    const parsedPresets = presets.reduce(
        (presetArray: Array<LocallyStoredPreset>, currPreset: unknown) => {
            if (!isPreset(currPreset)) {
                return presetArray
            }

            return presetArray.concat(currPreset)
        },
        [],
    )

    return parsedPresets
}

const isPreset = (preset: unknown): preset is LocallyStoredPreset => {
    if (typeof preset !== "object" || preset === null) {
        return false
    }

    if (!("name" in preset) || typeof preset.name !== "string") {
        return false
    }

    if (!("loginNames" in preset) || !Array.isArray(preset.loginNames)) {
        return false
    }

    if (!preset.loginNames.every((id) => typeof id === "string")) {
        return false
    }

    return true
}
