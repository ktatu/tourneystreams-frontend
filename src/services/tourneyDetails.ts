import axios from "axios"

const baseUrl = "http://localhost:3001/tourneydetails/"

const getTourneyDetails = async (id: number) => {
    console.log("id ", id)
    const res = await axios.get(baseUrl + id.toString())

    return res.data
}

export default { getTourneyDetails }