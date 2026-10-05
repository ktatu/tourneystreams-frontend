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
    {
        category: "Dota 2",
        title: "Learning the new patch",
        loginName: "mockstreamer3",
        broadcastName: "MockStreamer3",
        viewerCount: 875,
        profileImageUrl: "",
    },
    {
        category: "VALORANT",
        title: "Climbing ranked",
        loginName: "mockstreamer4",
        broadcastName: "MockStreamer4",
        viewerCount: 2310,
        profileImageUrl: "",
    },
    {
        category: "League of Legends",
        title: "Solo queue",
        loginName: "mockstreamer5",
        broadcastName: "MockStreamer5",
        viewerCount: 1640,
        profileImageUrl: "",
    },
    {
        category: "Counter-Strike 2",
        title: "Premier matches",
        loginName: "mockstreamer6",
        broadcastName: "MockStreamer6",
        viewerCount: 920,
        profileImageUrl: "",
    },
    {
        category: "Fortnite",
        title: "Zero Build duos",
        loginName: "mockstreamer7",
        broadcastName: "MockStreamer7",
        viewerCount: 1280,
        profileImageUrl: "",
    },
    {
        category: "Minecraft",
        title: "Building a new base",
        loginName: "mockstreamer8",
        broadcastName: "MockStreamer8",
        viewerCount: 415,
        profileImageUrl: "",
    },
    {
        category: "Overwatch",
        title: "Support games",
        loginName: "mockstreamer9",
        broadcastName: "MockStreamer9",
        viewerCount: 760,
        profileImageUrl: "",
    },
    {
        category: "Just Chatting",
        title: "Late night hangout",
        loginName: "mockstreamer10",
        broadcastName: "MockStreamer10",
        viewerCount: 295,
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
