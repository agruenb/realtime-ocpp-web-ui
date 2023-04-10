import { AddIcon, Button, Card, Pane, TextInputField } from "evergreen-ui";

export default function AddOcppStation(props: any) {
    return <Card padding={8} display="grid">
        <Pane>
            <TextInputField
                label="Ocpp Identity"
                description="The ID of the station. Must be unique."
                placeholder="pwr-bx-938-234-233-441"
            />
        </Pane>
        <Pane>
            <TextInputField
                label="Station Name"
                description="The name of the station. Should be used for easy recognition by humans."
                placeholder="Charger for parking spot 2"
            />
        </Pane>
        <Pane>
            <Button iconBefore={AddIcon} appearance="primary">Add Station</Button>
        </Pane>
    </Card>
}