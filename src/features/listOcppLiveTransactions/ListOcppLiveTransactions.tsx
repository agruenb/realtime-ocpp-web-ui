import { Table } from "evergreen-ui";
import { useEffect, useRef, useState } from "react";
import WsService from "../../shared/network/WsService";
import { OcppTransaction } from "../../shared/network/apiTypes";
import DataService from "../../shared/network/DataService";

export type LiveTransaction = {
    transactionId: number,
    ocppIdentity: string,
    connectorId: number,
    meterStart: number,
    started: string,
    finished?: string
    idTag?: string,
    meterStop?: number
}

export default function ListOcppLiveTransactions() {

    const [transactions, setTransactions] = useState<Array<LiveTransaction>>([]);
    
    const transactionsRef = useRef(transactions);
    transactionsRef.current = transactions;

    function liveTransactionFromOcppStartTransaction(transaction:OcppTransaction):LiveTransaction{
        return {
            transactionId: transaction.info.transactionId,
            ocppIdentity: transaction.info.ocppIdentity,
            connectorId: transaction.info.connectorId,
            meterStart: transaction.info.meterStart,
            started: transaction.info.timestamp,
            finished: "",
            idTag: transaction.info.idTag || "",
            meterStop: -1
        }
    }
    function mergeStartAndStopTransaction(startedTransaction:LiveTransaction, stopTransaction:OcppTransaction){
        return {
            ...startedTransaction,
            finished: stopTransaction.info.timestamp,
            meterStop: stopTransaction.info.timestamp
        }
    }

    function updateTransactions(updated:Array<OcppTransaction>){
        //update started transactions
        let newTransactions:Array<LiveTransaction> = transactionsRef.current.map((oldTransaction) => {
            const matchIndexInUpdated = updated.findIndex(
                updatedTransaction => updatedTransaction.info.transactionId === oldTransaction.transactionId
            );
            if(matchIndexInUpdated !== -1 && updated[matchIndexInUpdated].type === "stopTransaction"){
                return mergeStartAndStopTransaction(oldTransaction, updated[matchIndexInUpdated]);
            }else if(matchIndexInUpdated !== -1 && updated[matchIndexInUpdated].type === "startTransaction"){
                console.warn("Duplicate started transaction", updated[matchIndexInUpdated])
            }
            return {...oldTransaction};
        });
        //append new transactions
        for(const updatedTransaction of updated){
            //find started session with same id
            const i = transactionsRef.current.findIndex( oldTransaction => 
                updatedTransaction.info.transactionId === oldTransaction.transactionId
            );
            if(i === -1 && updatedTransaction.type === "startTransaction"){
                newTransactions.push(
                    liveTransactionFromOcppStartTransaction(updatedTransaction)
                );
            }else if(i === -1 && updatedTransaction.type === "stopTransaction"){
                console.warn("Got finished transaction without start", updatedTransaction);
            }
        }
        setTransactions(newTransactions);
    }

    /* function fetchSessions(){
        DataService.getOcppClientInfo()
        .then(
            (resp:any) => {
                updateSessions(resp);
            } 
        )
        .catch(
            (err:any) => {

            }
        )
    } */

    function subscribeToOcppTransactions(){
        let socket = WsService.subscribeOcppTransactions();
        socket.addEventListener("message", msg => {
            let updatedTransactions:Array<OcppTransaction> = JSON.parse(msg.data);
            updateTransactions(updatedTransactions);
        })
        return socket;
    }

    useEffect(()=>{
        /* fetchSessions(); */
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
                        <Table.TextCell>{transaction.started}</Table.TextCell>
                        <Table.TextCell>{
                            (transaction.finished==="")?"Live":"Finished"
                        }</Table.TextCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </>
}