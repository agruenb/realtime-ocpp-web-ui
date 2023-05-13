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
    lastSeen: number,
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
    connectorId: number,
    meterStart: number,
    meterStop?: number,
    timestampStart: string,
    timestampStop?: string
    idTag?: string,
}