import { Table } from "evergreen-ui";
import { useEffect, useRef, useState } from "react";
import WsService from "../../shared/network/WsService";
import { OcppTransaction } from "../../shared/network/apiTypes";
import DataService from "../../shared/network/DataService";

export default function ListOcppTransactions() {

    const [transactions, setTransactions] = useState<Array<OcppTransaction>>([]);
    
    const transactionsRef = useRef(transactions);
    transactionsRef.current = transactions;

    function updateTransactions(updated:Array<OcppTransaction>){
        //update old sessions
        let newSessions = transactionsRef.current.map((oldTransaction) => {
            const i = updated.findIndex( updatedTransaction => updatedTransaction.info.transactionId === oldTransaction.info.transactionId);
            if(i !== -1){
                return updated[i];
            }
            return oldTransaction;
        });
        //append new sessions
        /* for(const updatedSession of updatedSessions){
            const i = sessionsRef.current.findIndex( oldSession => updatedSession.ocppIdentity === oldSession.ocppIdentity);
            if(i === -1){
                newSessions.push(updatedSession);
            }
        }
        setSessions(newSessions); */
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
            console.log(msg);
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
                <Table.TextHeaderCell>Status</Table.TextHeaderCell>
            </Table.Head>
            <Table.Body>
                {transactions.map((transaction, index) => (
                    <Table.Row key={index}>
                        <Table.TextCell flexBasis={48} flexShrink={0} flexGrow={0}>{index}</Table.TextCell>
                        <Table.TextCell>{transaction.type}</Table.TextCell>
                        <Table.TextCell>{transaction.info.transactionId}</Table.TextCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </>
}