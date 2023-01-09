import axios from "axios"
import { TourneyCardProps } from "../types"

const baseUrl = "http://localhost:3001/tourneylist"

const getAll = async () => {
    const res = await axios.get(baseUrl)

    return res.data as TourneyCardProps[]
}

export default { getAll }