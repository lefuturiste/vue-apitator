import { AxiosRequestConfig } from 'axios'

export default interface RequestOptionsInterface {
    withAuth?: boolean
    keepLoading?: boolean
    loadingType?: string
    loading?: boolean
    body?: object
    maxHttpErrors?: number
    alertOnError?: boolean,
    headers?: object,
    axiosConfig?: AxiosRequestConfig
}
