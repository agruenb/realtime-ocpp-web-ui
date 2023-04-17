import { Button, Table } from "evergreen-ui";
import { useEffect, useRef, useState } from "react";
import WsService from "../../shared/network/WsService";
import { OcppSession } from "../../shared/network/apiTypes";
import DataService from "../../shared/network/DataService";

export default function ListOcppSessions() {

    const [sessions, setSessions] = useState<Array<OcppSession>>([]);
    
    const sessionsRef = useRef(sessions);
    sessionsRef.current = sessions;

    function updateSessions(updatedSessions:Array<OcppSession>){
        //update old sessions
        let newSessions = sessionsRef.current.map((oldSession, index) => {
            const i = updatedSessions.findIndex( newSession => newSession.ocppIdentity === oldSession.ocppIdentity);
            if(i !== -1){
                return updatedSessions[i];
            }
            return oldSession;
        });
        //append new sessions
        for(const updatedSession of updatedSessions){
            const i = sessionsRef.current.findIndex( oldSession => updatedSession.ocppIdentity === oldSession.ocppIdentity);
            if(i === -1){
                newSessions.push(updatedSession);
            }
        }
        setSessions(newSessions);
    }

    function fetchSessions(){
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
    }

    function subscribeToOcppClients(){
        let socket = WsService.subscribeOcppClients();
        socket.addEventListener("message", msg => {
            let updatedSessions:Array<OcppSession> = JSON.parse(msg.data);
            updateSessions(updatedSessions);
        })
        return socket;
    }

    useEffect(()=>{
        fetchSessions();
        const socket = subscribeToOcppClients();
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
                {sessions.map((session, index) => (
                    <Table.Row key={index}>
                        <Table.TextCell flexBasis={48} flexShrink={0} flexGrow={0}>{index}</Table.TextCell>
                        <Table.TextCell>{session.ocppIdentity}</Table.TextCell>
                        <Table.TextCell>{session.statusNotification?.status}</Table.TextCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </>
}