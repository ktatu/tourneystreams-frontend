import axios from "axios"
import { useQuery } from "react-query"
import useGameFilter from "../tournament_content/useGameFilter"
import { FollowedStream } from "./StreamCard"

const twitchToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NUb2tlbiI6InI2aGE5bTdzOXRuZ3ducGE3a2c4cm5lcjZ6YmlkcyIsInJlZnJlc2hUb2tlbiI6InB4dGYzeDU1bGVvMWZhcGQzbHdiajhhemdic2N4ajUyM3o4b2Jqb3FuZDM3YjhidWc1IiwidXNlcklkIjoiMTYyOTM3MTM3IiwiaWF0IjoxNjg4MTQ2MTgxfQ.Y0GLCB9MSjEM0gj2PIA3EWHgGZh4vNoQoLedAnseFRA"

const StreamCardsContainer = () => {
    /*
    const { isLoading, isError, data, error } = useQuery<FollowedStream[]>(
        "followedStream",
        async () => {
            const res = await axios.get<any[]>("http://localhost:3005/api/twitch", {
                headers: { Authorization: `Bearer ${twitchToken}` },
            })

            if (res.data === undefined) {
                throw new Error("No tourneys")
            }

            const tourneyInfoFilteredByGame = useGameFilter(res.data)

            return tourneyInfoFilteredByGame
        }
    )*/

    /*
    const { isLoading, isError, data, error } = useQuery("tourneyInfo", async () => {
        const res = await axios.get("http://localhost:3001/tourneyInfos")

        if (res.data === undefined) {
            throw new Error("No tourneys")
        }

        const tourneyInfoFilteredByGame = useGameFilter(res.data)

        return tourneyInfoFilteredByGame
    })*/

    return null
}

export default StreamCardsContainer
