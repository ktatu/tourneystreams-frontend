import { FollowedStream } from "./StreamCard"
import useSort from "./useSort"

describe("array of FollowedStream objects", () => {
    const sortableArray: Array<FollowedStream> = [
        {
            category: "Just Chatting",
            broadcastName: "Matti Meikalainen",
            loginName: "Matti123",
            title: "Terve kaikille",
            viewerCount: 10,
        },
        {
            category: "Best Game Ever",
            broadcastName: "John Doe",
            loginName: "john_doe",
            title: "Pwning noobs!",
            viewerCount: 1000,
        },
        {
            category: "Alphabetically first",
            broadcastName: "Example Name",
            loginName: "examplename",
            title: "First stream ever!",
            viewerCount: 1,
        },
        {
            category: "Shooter Game",
            broadcastName: "Tournament Organizer 123",
            loginName: "tourney_org_123",
            title: "Superduper cup finals",
            viewerCount: 500000,
        },
    ]

    test("is sorted by viewer count in descending order", () => {
        const sortedArray = useSort<FollowedStream>("viewerCount", sortableArray, true)

        expect(sortedArray.map((stream) => stream.viewerCount)).toStrictEqual([500000, 1000, 10, 1])
    })

    /*
    test("is sorted by category in alphabetical order", () => {
        const sortedArray = useSort<FollowedStream>("broadcastName", sortableArray)

        expect(sortedArray.map((stream) => stream.broadcastName)).toStrictEqual([
            "Example Name",
            "John Doe",
            "Matti Meikalainen",
            "Tournament Organizer 123",
        ])
    })*/
})
