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
    statusNotification: any
}
export type OcppTransaction = {
    type:string,
    info:any
}