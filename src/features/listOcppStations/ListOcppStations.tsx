import { Button, Table } from "evergreen-ui";
import { useEffect, useState } from "react";
import DataService from "../../shared/network/DataService";
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

    function deleteStation(stationId:number){
        DataService.deleteStation(stationId)
        .then(
            resp => {
                console.log(resp);
            }
        )
        .catch(
            err => {
                console.log(err);
            }
        ).finally(
            () => {
                fetchStations();
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
                <Table.TextHeaderCell flexBasis={96} flexShrink={0} flexGrow={0} />
            </Table.Head>
            <Table.Body>
                {stations.map((station) => (
                    <Table.Row key={station.id}>
                        <Table.TextCell flexBasis={48} flexShrink={0} flexGrow={0}>{station.id}</Table.TextCell>
                        <Table.TextCell>{station.ocppIdentity}</Table.TextCell>
                        <Table.TextCell>{station.name}</Table.TextCell>
                        <Table.TextCell flexBasis={96} flexShrink={0} flexGrow={0}>
                            <Button appearance="minimal" onClick={()=>{deleteStation(station.id)}}>
                                Delete
                            </Button>
                        </Table.TextCell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </>
}