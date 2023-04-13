import { AddIcon, Button, Card, Pane, TextInputField } from "evergreen-ui";
import { useState } from "react";
import DataService from "../../shared/network/Dataservice";
import UiAlert from "../../shared/ui/UiAlert/UiAlert";

export default function AddOcppStation(props: any) {

    const [statusMessage, setStatusMessage] = useState("");
    const [statusMessageType, setStatusMessageType] = useState("");
    const [inFlight, setInFlight] = useState(false);

    const [ocppId, setOcppId] = useState("");
    const [stationName, setStationName] = useState("");

    function postStation() {
        setInFlight(true);
        setStatusMessage("");
        let newStation = {
            ocppIdentity: ocppId,
            name: stationName
        }
        DataService.postStation(newStation).then(
            () => {
                setStatusMessageType("success");
                setStatusMessage(`Successfully added ${ocppId}`);
            }
        ).catch(
            err => {
                console.log(err);
                setStatusMessageType("danger");
                setStatusMessage(`Could not add ${ocppId}`);
            }
        ).finally(
            () => {
                setInFlight(false);
            }
        );
    }
    return <Card padding={8} display="grid">
        <Pane marginBottom={16}>
            <UiAlert type={statusMessageType} title={statusMessage} />
        </Pane>
        <Pane>
            <TextInputField
                label="Ocpp Identity"
                description="The ID of the station. Must be unique."
                placeholder="pwr-bx-938-234-233-441"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOcppId(e.currentTarget.value)}
            />
        </Pane>
        <Pane>
            <TextInputField
                label="Station Name"
                description="The name of the station. Should be used for easy recognition by humans."
                placeholder="Charger for parking spot 2"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStationName(e.currentTarget.value)}
            />
        </Pane>
        <Pane>
            <Button iconBefore={AddIcon} appearance="primary" onClick={()=>postStation()}>Add Station</Button>
        </Pane>
    </Card>
}