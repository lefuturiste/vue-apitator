export default interface RequestOptionsInterface {
    withAuth?: boolean
    keepLoading?: boolean
    loadingType?: string
    body?: object
    maxHttpErrors?: number
    alertOnError?: boolean,
    headers?: object
}
