export type UserSetting = "maxStreams" | "autocloseEndedStreams" | "hideStreamThumbnails"

class UserSettings {
    private static DEFAULT_MAX_STREAMS = "6"
    private static DEFAULT_AUTO_CLOSE_ENDED_STREAMS = "true"
    private static DEFAULT_HIDE_STREAM_THUMBNAILS = "false"

    static get(setting: UserSetting) {
        const settingVal = localStorage.getItem(setting) ?? this.getDefault(setting)

        return JSON.parse(settingVal)
    }

    static save(setting: UserSetting, newVal: unknown) {
        localStorage.setItem(setting, JSON.stringify(newVal))
    }

    private static getDefault(setting: UserSetting) {
        switch (setting) {
            case "maxStreams":
                return this.DEFAULT_MAX_STREAMS
            case "autocloseEndedStreams":
                return this.DEFAULT_AUTO_CLOSE_ENDED_STREAMS
            default:
                return this.DEFAULT_HIDE_STREAM_THUMBNAILS
        }
    }
}

export default UserSettings
