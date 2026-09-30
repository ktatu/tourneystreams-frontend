import { LocallyStoredPreset } from "../../../types"

class PresetLocalStorage {
    private static inst: PresetLocalStorage

    private constructor() {
        if (!localStorage.getItem("presets")) {
            localStorage.setItem("presets", JSON.stringify([]))
        }
    }

    static get instance(): PresetLocalStorage {
        if (!PresetLocalStorage.inst) {
            PresetLocalStorage.inst = new PresetLocalStorage()
        }

        return PresetLocalStorage.inst
    }

    getStoredPresets() {
        const storedPresetsString = localStorage.getItem("presets") as string
        const parsedPresets = parseStoredPresets(storedPresetsString)

        return parsedPresets
    }

    savePreset(newPreset: LocallyStoredPreset) {
        const savedPresets = this.getStoredPresets()
        newPreset.name = newPreset.name.toLocaleLowerCase()

        if (newPreset.channels.find((name) => name.length < 4 || name.length > 25)) {
            throw new Error("Channels between 4 and 25 characters")
        }
        if (newPreset.name.length > 30) {
            throw new Error("Preset name max length 30")
        }
        if (savedPresets && savedPresets.map((preset) => preset.name).includes(newPreset.name)) {
            throw new Error("Preset name already in use")
        }

        const newPresetsToSave = savedPresets.concat(newPreset)
        localStorage.setItem("presets", JSON.stringify(newPresetsToSave))
    }

    deletePreset = (name: string) => {
        name = name.toLocaleLowerCase()
        const savedPresets = this.getStoredPresets()

        const newPresets = savedPresets.filter((preset) => preset.name !== name)
        localStorage.setItem("presets", JSON.stringify(newPresets))
    }
}

const parseStoredPresets = (presetsString: string) => {
    const presets = JSON.parse(presetsString)

    if (!Array.isArray(presets)) {
        return []
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

export default PresetLocalStorage
