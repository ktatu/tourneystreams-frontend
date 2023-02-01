import { useAppDispatch } from "./reduxHooks"
import { addChannel, removeChannel } from "../reducers/channelReducer"
import useQueryParams from "./useQueryParams"

const useChannels = () => {
    const dispatch = useAppDispatch()
    const queryParams = useQueryParams()

    const addStream = (channel: string) => {
        if (!isValidChannelName(channel)) {
            return
        }
        queryParams.addStream(channel)
        dispatch(addChannel(channel))
    }

    const removeStream = (channel: string) => {
        queryParams.removeStream(channel)
        dispatch(removeChannel(channel))
    }

    const initializeStreams = () => {
        queryParams.getStreams().forEach((channel: string) => {
            addStream(channel)
        })
    }

    return {
        addStream,
        initializeStreams,
        removeStream,
    }
}

const isValidChannelName = (channel: string) => {
    // https://discuss.dev.twitch.tv/t/twitch-channel-name-regex/3855/2

    const regex = /^(#)?[a-zA-Z0-9]{2,25}$/

    return regex.test(channel)
}

export default useChannels
