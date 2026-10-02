import { Preset } from "../../../types"

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

    savePreset(newPreset: Preset) {
        const savedPresets = this.getStoredPresets()
        newPreset.name = newPreset.name.toLocaleLowerCase()

        if (
            newPreset.channels.find(
                (channel) => channel.name.length < 4 || channel.name.length > 25,
            )
        ) {
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

    updatePreset(updatedPreset: Preset, nameOfPresetToUpdate: string) {
        this.deletePreset(nameOfPresetToUpdate)
        this.savePreset(updatedPreset)
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

    const parsedPresets = presets.reduce((presetArray: Array<Preset>, currPreset: unknown) => {
        if (!isPreset(currPreset)) {
            return presetArray
        }

        return presetArray.concat(currPreset)
    }, [])

    return parsedPresets
}

const isPreset = (preset: unknown): preset is Preset => {
    if (typeof preset !== "object" || preset === null) {
        return false
    }

    if (!("name" in preset) || typeof preset.name !== "string") {
        return false
    }

    if (!("channels" in preset) || !Array.isArray(preset.channels)) {
        return false
    }

    preset.channels.forEach((channel) => {
        if (!("name" in channel) || typeof channel !== "string") {
            return false
        }
    })

    return true
}

export default PresetLocalStorage
