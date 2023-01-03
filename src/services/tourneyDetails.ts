import axios from "axios"

const baseUrl = "http://localhost:3001/tourneydetails/"

const getTourneyDetails = async (id: number) => {
    const res = await axios.get(baseUrl + id)

    return res.data
}

export default { getTourneyDetails }