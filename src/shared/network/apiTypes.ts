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
export type OcppTransactionFinal = {
    transactionId: number,
    ocppIdentity: string,
    connectorId: number,
    meterStart: number,
    meterStop: number,
    timestampStart: string,
    timestampStop: string
    idTag?: string,
}