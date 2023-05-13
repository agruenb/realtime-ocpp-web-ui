import { Table } from "evergreen-ui";
import { useEffect, useRef, useState } from "react";
import WsService from "../../shared/network/WsService";
import { OcppTransaction, OcppTransactionUpdate } from "../../shared/network/apiTypes";
import DataService from "../../shared/network/DataService";

export type LiveTransaction = {
    transactionId: number,
    ocppIdentity: string,
    connectorId: number,
    meterStart: number,
    timestampStart: string,
    timestampStop?: string
    idTag?: string,
    meterStop?: number,
    meterValue?: any
}

export default function ListOcppLiveTransactions() {

    const [transactions, setTransactions] = useState<Array<LiveTransaction>>([]);
    
    const transactionsRef = useRef(transactions);
    transactionsRef.current = transactions;

    function liveTransactionFromOcppStartTransaction(transaction:OcppTransactionUpdate):LiveTransaction{
        return {
            transactionId: transaction.info.transactionId,
            ocppIdentity: transaction.info.ocppIdentity,
            connectorId: transaction.info.connectorId,
            meterStart: transaction.info.meterStart,
            timestampStart: transaction.info.timestamp,
            timestampStop: "",
            idTag: transaction.info.idTag || "",
            meterStop: -1,
            meterValue: []
        }
    }
    function liveTransactionFromOcppTransaction(transaction:OcppTransaction):LiveTransaction{
        return {
            transactionId: transaction.id,
            ocppIdentity: transaction.ocppIdentity,
            connectorId: transaction.connectorId,
            meterStart: transaction.meterStart,
            timestampStart: transaction.timestampStart,
            timestampStop: transaction.timestampStop || "",
            idTag: transaction.idTag || "",
            meterStop: transaction.meterStop || -1
        }
    }
    function mergeStartAndStopTransaction(startedTransaction:LiveTransaction, stopTransaction:OcppTransactionUpdate){
        return {
            ...startedTransaction,
            timestampStop: stopTransaction.info.timestamp,
            meterStop: stopTransaction.info.meterStop
        }
    }

    function updateTransactions(updated:Array<OcppTransactionUpdate>){
        let currentTransactions = transactionsRef.current;
        let newTransactions:Array<LiveTransaction> = currentTransactions.map( trans => {
            return {...trans}
        });
        for(let transactionUpdate of updated){
            switch(transactionUpdate.type){
                case "stopTransaction":
                    let matchingCurrentTransaction = newTransactions.filter(trans => {
                        return trans.transactionId === transactionUpdate.info.transactionId;
                    })[0];
                    if(!matchingCurrentTransaction){
                        console.warn("Got stopTransaction for unknown transaction");
                        break;
                    }
                    let mergedTransaction = mergeStartAndStopTransaction(matchingCurrentTransaction, transactionUpdate);
                    let index = newTransactions.indexOf(matchingCurrentTransaction);
                    newTransactions.splice(index, 1, mergedTransaction);
                    break;
                case "meterValuesTransaction":
                    console.log("Got meter values");
                    break;
                case "startTransaction":
                    let existingTransaction = newTransactions.findIndex( trans => {
                        return trans.transactionId === transactionUpdate.info.transactionId;
                    })
                    if(existingTransaction !== -1){
                        console.warn("Got duplicate startTransaction");
                        break;
                    }
                    newTransactions.push(
                        liveTransactionFromOcppStartTransaction(transactionUpdate)
                    );
                    break;
            }   
        }
        setTransactions(newTransactions);
    }

    function fetchTransactions(){
        DataService.getUnfinishedTransactions()
        .then(
            (resp) => {
                console.log(resp);
                setTransactions(resp.map(trans => liveTransactionFromOcppTransaction(trans)));
            } 
        )
        .catch(
            (err:any) => {

            }
        )
    }

    function subscribeToOcppTransactions(){
        let socket = WsService.subscribeOcppTransactions();
        socket.addEventListener("message", msg => {
            let updatedTransactions:Array<OcppTransactionUpdate> = JSON.parse(msg.data);
            console.log("trans WS:", updatedTransactions);
            updateTransactions(updatedTransactions);
        })
        return socket;
    }

    useEffect(()=>{
        fetchTransactions();
        const socket = subscribeToOcppTransactions();
        return () => {
            socket.close();
        }
    }, []);

    return <>
        <Table>
            <Table.Head>
                <Table.TextHeaderCell flexBasis={48} flexShrink={0} flexGrow={0}>#</Table.TextHeaderCell>
                <Table.TextHeaderCell>Ocpp ID</Table.TextHeaderCell>
                <Table.TextHeaderCell>Connector</Table.TextHeaderCell>
                <Table.TextHeaderCell>Start Time</Table.TextHeaderCell>
                <Table.TextHeaderCell>Status</Table.TextHeaderCell>
            </Table.Head>
            <Table.Body>
                {transactions.map((transaction, index) => (
                    <Table.Row key={index}>
                        <Table.TextCell flexBasis={48} flexShrink={0} flexGrow={0}>{transaction.transactionId}</Table.TextCell>
                        <Table.TextCell>{transaction.ocppIdentity}</Table.TextCell>
                        <Table.TextCell>{transaction.connectorId}</Table.TextCell>
                        <Table.TextCell>{
                            (new Date(transaction.timestampStart)).toLocaleTimeString("en-US")
                        }</Table.TextCell>
                        <Table.TextCell>{
                            (transaction.timestampStop && transaction.timestampStop !== "")?"Finished":"Open"
                        }</Table.TextCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </>
}