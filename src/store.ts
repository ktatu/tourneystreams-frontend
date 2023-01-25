import { configureStore } from "@reduxjs/toolkit"
import channelReducer from "./reducers/channelReducer"

const store = configureStore({
    reducer: {
        channels: channelReducer,
    },
})

export default store
