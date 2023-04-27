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
export type OcppTransactionUpdate = {
    type:string,
    info:any
}
export type OcppTransaction = {
    id: number,
    transactionId: number,
    ocppIdentity: string,
    meterStart: number,
    meterStop?: number,
    timestampStart: string,
    timestampStop?: string
    idTag?: string,
}