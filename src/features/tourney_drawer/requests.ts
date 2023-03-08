import axios from "axios"

const BASE_URL = "http://localhost:3001/tourneyInfos"

export const getTourneyInfos = () => {
    return axios.get(BASE_URL)
}

export default {}
