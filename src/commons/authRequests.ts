import axios, { AxiosRequestConfig } from "axios"
import { BACKEND_BASE_URL } from "../envConfig"

const axiosClient = axios.create()

export const fetch = async <T>(endpoint: string, params?: AxiosRequestConfig["params"]) => {
    const res = await axiosClient.get<T>(`${BACKEND_BASE_URL}/${endpoint}`, {
        params,
        withCredentials: true,
    })

    return res
}

export const wakeupServer = () => {
    try {
        axiosClient.get(`${BACKEND_BASE_URL}/healthcheck`)
    } 
    // prettier-ignore
    // eslint-disable-next-line
    catch (error) {}
}
