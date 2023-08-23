import { proxy } from "valtio"

interface ChatState {
    chatIsVisible: boolean
    selectedChannel: string
}

export const chatState = proxy<ChatState>({
    chatIsVisible: true,
    selectedChannel: "",
})
