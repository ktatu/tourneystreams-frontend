import axios, { AxiosRequestConfig } from "axios"
import { BACKEND_BASE_URL } from "../envConfig"

const axiosClient = axios.create()

export const get = async <T>(endpoint: string, params?: AxiosRequestConfig["params"]) => {
    const res = await axiosClient.get<T>(`${BACKEND_BASE_URL}/${endpoint}`, {
        params,
        withCredentials: true,
        timeout: 10000
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
