import { createSlice } from "@reduxjs/toolkit"

export interface ChannelState {
    selectedChannels: string[]
    activeChatChannel: string
}

const initialState: ChannelState = {
    selectedChannels: [],
    activeChatChannel: "",
}

const channelSlice = createSlice({
    name: "channels",
    initialState,
    reducers: {
        addChannel(state, action) {
            const channel: string = action.payload
            if (!state.selectedChannels.includes(channel)) {
                state.selectedChannels.push(channel)
            }
        },
        removeChannel(state, action) {
            const channel: string = action.payload
            const filteredChannels = state.selectedChannels.filter(
                (stateChannel) => stateChannel !== channel
            )

            return { ...state, selectedChannels: filteredChannels }
        },
    },
})

export const { addChannel, removeChannel } = channelSlice.actions
export default channelSlice.reducer
