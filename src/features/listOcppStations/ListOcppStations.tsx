import { Table } from "evergreen-ui";
import { useEffect, useState } from "react";
import DataService from "../../shared/network/Dataservice";
import { Station } from "../../shared/network/apiTypes";

export default function ListOcppStations() {

    const [stations, setStations] = useState<Array<Station>>([]);

    function fetchStations(){
        return DataService.getStation().then(
            resp => {
                setStations(resp);
            }
        )
    }

    useEffect(()=>{
        let request = fetchStations();
    });

    return <>
        <Table>
            <Table.Head>
                <Table.TextHeaderCell flexBasis={48} flexShrink={0} flexGrow={0}>#</Table.TextHeaderCell>
                <Table.TextHeaderCell>Ocpp ID</Table.TextHeaderCell>
                <Table.TextHeaderCell>Name</Table.TextHeaderCell>
            </Table.Head>
            <Table.Body>
                {stations.map((station) => (
                    <Table.Row key={station.id}>
                        <Table.TextCell flexBasis={48} flexShrink={0} flexGrow={0}>{station.id}</Table.TextCell>
                        <Table.TextCell>{station.ocppIdentity}</Table.TextCell>
                        <Table.TextCell>{station.name}</Table.TextCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </>
}