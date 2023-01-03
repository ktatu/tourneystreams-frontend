import axios from "axios"
import { TourneyListEntryProps } from "../types"

const baseUrl = "http://localhost:3001/tourneylist"

const getAll = async () => {
    const res = await axios.get(baseUrl)

    return res.data as TourneyListEntryProps[]
}

export default { getAll }