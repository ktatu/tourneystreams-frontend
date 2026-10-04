// AI-generated module by Claude Sonnet 5.5 (GitHub Copilot): msw request handlers for running without the backend.
import { HttpResponse, http } from "msw"
import { BACKEND_BASE_URL } from "../envConfig"
import { TwitchStream } from "../types"

const followedStreams: Array<TwitchStream> = [
    {
        category: "Apex Legends",
        title: "Ranked grind",
        loginName: "mockstreamer1",
        broadcastName: "MockStreamer1",
        viewerCount: 1520,
        profileImageUrl: "",
    },
    {
        category: "Just Chatting",
        title: "Chilling",
        loginName: "mockstreamer2",
        broadcastName: "MockStreamer2",
        viewerCount: 340,
        profileImageUrl: "",
    },
]

export const handlers = [
    http.get(`${BACKEND_BASE_URL}/twitch`, () => HttpResponse.json({ streams: followedStreams })),

    http.get(`${BACKEND_BASE_URL}/twitch/streams`, ({ request }) => {
        const channels = new URL(request.url).searchParams.getAll("channels")
        const streams = channels.map((channel, index) => ({
            loginName: channel,
            broadcastName: `Mock broadcast of ${channel}`,
            viewerCount: String(100 * (index + 1)),
        }))

        return HttpResponse.json({ streams })
    }),

    http.get(`${BACKEND_BASE_URL}/youtube/channelname/:streamId`, ({ params }) =>
        HttpResponse.json({ channel: `Mock YouTube channel ${params.streamId}` }),
    ),
]
