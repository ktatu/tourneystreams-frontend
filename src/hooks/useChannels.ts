import { useDispatch } from "react-redux"
import { addChannel, removeChannel } from "../reducers/channelReducer"

const useChannels = () => {
    const dispatch = useDispatch()

    const addStream = (channel: string) => {
        if (!isValidChannelName(channel)) {
            return
        }
        dispatch(addChannel(channel))
    }

    const removeStream = (channel: string) => {
        dispatch(removeChannel(channel))
    }

    const initializeStreamsFromParams = () => {
        console.log("---")
    }

    return {
        addStream,
        initializeStreamsFromParams,
        removeStream,
    }
}

const isValidChannelName = (channel: string) => {
    // https://discuss.dev.twitch.tv/t/twitch-channel-name-regex/3855/2
    const regex = /[a-zA-Z0-9][\w]{2,24}$/

    return regex.test(channel)
}

export default useChannels
