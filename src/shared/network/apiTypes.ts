export type StationTemplate = {
    name: string,
    ocppIdentity: string
}
export type Station = {
    id: number,
    name: string,
    ocppIdentity: string
}
export type OcppSession = {
    ocppIdentity: string,
    stationName: string,
    statusNotification: any
}